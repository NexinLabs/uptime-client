import models from "@/models/index.models";
import { IService } from "@/models/service.model";
import axios, { AxiosRequestConfig } from "axios";
import { Logger } from "@/ext/logger";

const logger = Logger.instance;

class ServiceMonitor {
    private static services: Map<string, NodeJS.Timeout> = new Map();
    private static isInitialized: boolean = false;

    /**
     * Initialize the service monitor
     * Fetches all active services and starts monitoring them
     */
    public static async initialize(): Promise<void> {
        if (this.isInitialized) {
            logger.warn("ServiceMonitor already initialized");
            return;
        }

        try {
            logger.info("Initializing Service Monitor...");
            const services = await models.Service.find().populate('method').exec();

            for (const service of services) {
                this.scheduleServiceCheck(service);
            }

            this.isInitialized = true;
            logger.info(`Service Monitor initialized with ${services.length} services`);
        } catch (error) {
            logger.error("Failed to initialize Service Monitor", error);
            throw error;
        }
    }


    /**
     * Add a new service to monitor
     */
    public static async addService(serviceId: string): Promise<void> {
        try {
            const service = await models.Service.findById(serviceId).populate('method').exec();
            if (!service) {
                logger.warn(`Service ${serviceId} not found`);
                return;
            }

            // Cancel existing schedule if any
            this.removeService(serviceId);

            // Schedule new check
            this.scheduleServiceCheck(service);
            logger.info(`Added service ${service.name} (${serviceId}) to monitor`);
        } catch (error) {
            logger.error(`Error adding service ${serviceId} to monitor`, error);
        }
    }

    /**
     * Remove a service from monitoring
     */
    public static removeService(serviceId: string): void {
        const timeout = this.services.get(serviceId);
        if (timeout) {
            clearTimeout(timeout);
            this.services.delete(serviceId);
            logger.info(`Removed service ${serviceId} from monitor`);
        }
    }

    /**
     * Schedule the next check for a service
     */
    private static scheduleServiceCheck(service: IService): void {
        const serviceId = service._id.toString();

        // Clear existing timeout if any
        const existingTimeout = this.services.get(serviceId);
        if (existingTimeout) {
            clearTimeout(existingTimeout);
        }

        // Calculate delay: if service was recently checked, adjust delay accordingly
        const now = Date.now();
        const lastRun = service.lastrun ? new Date(service.lastrun).getTime() : now;
        const timeSinceLastRun = Math.max(0, now - lastRun);
        const delayMs = Math.max(0, (service.delay * 1000) - timeSinceLastRun);

        // Schedule next check
        const timeout = setTimeout(async () => {
            await this.checkService(service);
        }, delayMs);

        this.services.set(serviceId, timeout);

        logger.debug(`Scheduled check for ${service.name} in ${Math.round(delayMs / 1000)}s`);
    }

    /**
     * Check if a service is running by sending request to its endpoint
     */
    private static async checkService(service: IService): Promise<void> {
        const serviceId = service._id.toString();

        try {
            logger.debug(`Checking service: ${service.name} (${service.url})`);

            // Extract method string from populated Method object
            const methodStr = typeof service.method === 'object' && service.method !== null 
                ? (service.method as any).method 
                : service.method;

            // Prepare request configuration
            const config: AxiosRequestConfig = {
                method: methodStr,
                url: service.url,
                headers: service.headers || {},
                timeout: 30000, // 30 second timeout
                validateStatus: () => true, // Don't throw on any status code
            };

            // Add body only for POST requests
            if (methodStr === 'POST' && service.body) {
                config.data = service.body;
            }

            // Send request
            const startTime = Date.now();
            const response = await axios(config);
            const responseTime = Date.now() - startTime;

            logger.info(`Service ${service.name} responded with status ${response.status} (${responseTime}ms)`);

            // Check if response indicates service is down
            if (response.status >= 400) {
                // Update service status to down (0) and last run time
                await models.Service.findByIdAndUpdate(serviceId, {
                    status: 0,
                    lastrun: new Date(),
                });
                await this.logServiceError(service, response.status, response.statusText, responseTime);
                logger.warn(`Service ${service.name} returned error: ${response.status} ${response.statusText}`);
            } else {
                // Service is up - update status to up (1) and last run time
                await models.Service.findByIdAndUpdate(serviceId, {
                    status: 1,
                    lastrun: new Date(),
                });
                await this.logServiceSuccess(service, response.status, responseTime);
                logger.info(`Service ${service.name} is up: ${response.status} (${responseTime}ms)`);
            }

        } catch (error: any) {
            // Network error, timeout, or other error - update status to down (0)
            await models.Service.findByIdAndUpdate(serviceId, {
                status: 0,
                lastrun: new Date(),
            });
            await this.logServiceError(
                service,
                error.code === 'ECONNABORTED' ? 408 : 0,
                error.message,
                0
            );
            logger.error(`Service ${service.name} check failed: ${error.message}`);
        } finally {
            // Reschedule next check
            try {
                // Fetch latest service data in case delay was updated
                const updatedService = await models.Service.findById(serviceId).populate('method').exec();
                if (updatedService) {
                    this.scheduleServiceCheck(updatedService);
                } else {
                    // Service was deleted, remove from monitoring
                    this.removeService(serviceId);
                }
            } catch (error) {
                logger.error(`Error rescheduling service ${serviceId}`, error);
                // Fallback: reschedule with original service data
                this.scheduleServiceCheck(service);
            }
        }
    }

    /**
     * Log service error to database
     */
    private static async logServiceError(
        service: IService,
        statusCode: number,
        message: string,
        responseTime: number
    ): Promise<void> {
        try {
            const methodStr = typeof service.method === 'object' && service.method !== null 
                ? (service.method as any).method 
                : service.method;

            const logRecord = {
                method: methodStr,
                level: 'error' as const,
                status_code: statusCode,
                message: `Service check failed: ${message}`,
                meta: {
                    url: service.url,
                    response_time_ms: responseTime,
                    timestamp: new Date(),
                },
            };

            // Find or create log document for this service
            await models.Log.findOneAndUpdate(
                { service: service._id },
                {
                    $push: {
                        records: {
                            $each: [logRecord],
                            $slice: -100 // Keep only last 100 records
                        }
                    }
                },
                { upsert: true, new: true }
            );

        } catch (error) {
            logger.error(`Failed to log error for service ${service.name}`, error);
        }
    }

    /**
     * Log service success to database
     */
    private static async logServiceSuccess(
        service: IService,
        statusCode: number,
        responseTime: number
    ): Promise<void> {
        try {
            const methodStr = typeof service.method === 'object' && service.method !== null 
                ? (service.method as any).method 
                : service.method;

            const logRecord = {
                method: methodStr,
                level: 'info' as const,
                status_code: statusCode,
                message: `Service check successful`,
                meta: {
                    url: service.url,
                    response_time_ms: responseTime,
                    timestamp: new Date(),
                },
            };

            // Find or create log document for this service
            await models.Log.findOneAndUpdate(
                { service: service._id },
                {
                    $push: {
                        records: {
                            $each: [logRecord],
                            $slice: -100 // Keep only last 100 records
                        }
                    }
                },
                { upsert: true, new: true }
            );

        } catch (error) {
            logger.error(`Failed to log success for service ${service.name}`, error);
        }
    }

    /**
     * Update a service's monitoring configuration
     */
    public static async updateService(serviceId: string): Promise<void> {
        await this.addService(serviceId); // This will reschedule with new config
    }

    /**
     * Stop all monitoring
     */
    public static shutdown(): void {
        logger.info("Shutting down Service Monitor...");
        for (const [serviceId, timeout] of this.services.entries()) {
            clearTimeout(timeout);
        }
        this.services.clear();
        this.isInitialized = false;
        logger.info("Service Monitor shutdown complete");
    }

    /**
     * Get monitoring status
     */
    public static getStatus(): { isInitialized: boolean; activeServices: number } {
        return {
            isInitialized: this.isInitialized,
            activeServices: this.services.size,
        };
    }
}

export default ServiceMonitor;