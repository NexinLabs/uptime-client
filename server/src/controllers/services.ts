import { Request, Response } from "express";
import ServiceMonitor from "@/utils/services/monitor";
import type { IService } from "@/models/service.model";

interface AllServiceCache{
    createdAt: number;
    service: IService[];
}  


export default class ServiceController {
    private static serviceCache = new Map<string, AllServiceCache>();
    private static statsCache = new Map<string, any>();

    /**
     * returns all available services listed by the user
     * @route GET /services
     * @access Private
     */
    static async getServices(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }

            const now = Date.now();
            const cacheServices = ServiceController.serviceCache.get(req.user._id.toString());
            if (cacheServices && (now - cacheServices.createdAt) < 30000) {
                return res.handler.success(res, "Services retrieved successfully (from cache)", cacheServices.service);
            }

            const services = await res.models.Service.find({
                owner: req.user._id
            }).lean();

            // Update cache
            ServiceController.serviceCache.set(req.user._id.toString(), {
                createdAt: now,
                service: services as any
            });

            res.handler.success(res, "Services retrieved successfully", services);
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving services", error);
        }
    }

    /**
     * creates a new service for the user
     * @route POST /services
     * @access Private
     */
    static async createService(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }

            // Create service with method string directly
            const serviceData = {
                ...req.body,
                owner: req.user._id,
                method: req.body.method || 'HEAD',
            };

            const newService = new res.models.Service(serviceData);
            await newService.save();

            // Start monitoring the new service
            await ServiceMonitor.addService(newService._id.toString());

            res.handler.created(res, "Service created successfully", newService);
        } catch (error) {
            res.handler.internalServerError(res, "Error creating service", error);
        }
    }


    /**creates a new restarter for a specific service
     * @route POST /services/:serviceId/restarter
     * @access Private
     */
    static async createServiceRestarter(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }
            const serviceId = req.params.serviceId as string;
            const restarterData = {
                ...req.body,
                service: serviceId,
            };

            const newRestarter = new res.models.Restarter(restarterData);
            await newRestarter.save();
            res.handler.created(res, "Service restarter created successfully", newRestarter);
        } catch (error) {
            res.handler.internalServerError(res, "Error creating service restarter", error);
        }
    }



    /**
     * returns a specific service by ID for the authenticated user
     * @route GET /services/:serviceId
     * @access Private
     */
    static async getService(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }
            const service = await res.models.Service.findOne({
                _id: req.params.serviceId as string,
                owner: req.user._id
            }).populate('restarter log');

            if (!service) {
                return res.handler.notFound(res, "Service not found");
            }
            res.handler.success(res, "Service retrieved successfully", service);
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving service", error);
        }
    }

    /**
     * updates a specific service by ID for the authenticated user
     * @route PUT /services/:serviceId
     * @access Private
     */
    static async updateService(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }

            const service = await res.models.Service.findOneAndUpdate(
                { _id: req.params.serviceId as string, owner: req.user._id },
                req.body,
                { new: true, runValidators: true }
            );

            if (!service) {
                return res.handler.notFound(res, "Service not found");
            }

            // Update service monitoring with new configuration
            await ServiceMonitor.updateService(service._id.toString());

            res.handler.success(res, "Service updated successfully", service);
        } catch (error) {
            res.handler.internalServerError(res, "Error updating service", error);
        }
    }

    /**
     * deletes a specific service by ID for the authenticated user
     * @route DELETE /services/:serviceId
     * @access Private
     */
    static async deleteService(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }
            const serviceId = req.params.serviceId as string;
            const service = await res.models.Service.deleteOne({ _id: serviceId });
            if (service.deletedCount === 0) {
                return res.handler.notFound(res, "Service not found");
            }

            // Remove service from monitoring
            ServiceMonitor.removeService(serviceId);

            res.handler.success(res, "Service deleted successfully");

            // delete associated data
            res.models.Log.deleteOne({ service: serviceId });
            res.models.Report.deleteOne({ service: serviceId });

        } catch (error) {
            res.handler.internalServerError(res, "Error deleting service", error);
        }
    }

    /**
     * returns performance overview of all user services
     * @route GET /services/overview/stats
     * @access Private
     */
    static async getOverview(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }

            const now = Date.now();
            const cacheStats = ServiceController.statsCache.get(req.user._id.toString());
            if (cacheStats && (now - cacheStats.createdAt) < 30000) {
                return res.handler.success(res, "Overview stats retrieved successfully (from cache)", cacheStats.stats);
            }

            const services = await res.models.Service.find({
                owner: req.user._id
            }).populate('report').populate('method');

            const totalServices = services.length;

            // Calculate uptime percentage
            const activeServices = services.filter(s => s.status === 1).length;
            const overallUptime = totalServices > 0
                ? ((activeServices / totalServices) * 100).toFixed(1)
                : '0.0';

            // Calculate average response time from recent logs
            let totalResponseTime = 0;
            let logsWithResponseTime = 0;

            for (const service of services) {
                try {
                    const logDoc = await res.models.Log.findOne({ service: service._id }).select('records').lean();
                    if (logDoc && logDoc.records && logDoc.records.length > 0) {
                        // Get the last 10 records for this service
                        const recentRecords = logDoc.records.slice(-10);
                        recentRecords.forEach((record: any) => {
                            if (record.meta?.response_time_ms && record.meta.response_time_ms > 0) {
                                totalResponseTime += record.meta.response_time_ms;
                                logsWithResponseTime++;
                            }
                        });
                    }
                } catch (error) {
                    // Skip this service if log retrieval fails
                    continue;
                }
            }

            const avgResponseTime = logsWithResponseTime > 0
                ? Math.round(totalResponseTime / logsWithResponseTime)
                : 0;

            // Count incidents (services with status 0 or issues)
            const incidents = services.filter(s => s.status === 0 || s.status === 2).length;

            const overview = {
                overallUptime: parseFloat(overallUptime),
                avgResponseTime,
                totalServices,
                activeServices,
                incidents,
                status: incidents === 0 ? 'OPERATIONAL' : incidents < 3 ? 'DEGRADED' : 'OUTAGE'
            };

            // Update cache
            ServiceController.statsCache.set(req.user._id.toString(), {
                createdAt: now,
                stats: overview
            });

            res.json(overview);
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving overview", error);
        }
    }

    /**
     * returns recent activity logs for all user services
     * @route GET /services/logs/recent
     * @access Private
     */
    static async getRecentLogs(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }

            const limit = parseInt(req.query.limit as string) || 50;

            const services = await res.models.Service.find({ owner: req.user._id }).sort({ lastrun: -1 }).limit(limit).populate('report').populate('method');

            const logs = services.map(service => {
                const methodStr = typeof service.method === 'object' && service.method !== null
                    ? (service.method as any).method
                    : service.method;

                return {
                    id: service._id,
                    serviceName: service.name || service.url,
                    url: service.url,
                    method: methodStr,
                    status: service.status === 1 ? 'success' : service.status === 0 ? 'failed' : 'pending',
                    statusCode: service.status,
                    timestamp: service.lastrun,
                    message: service.status === 1
                        ? 'Service check successful'
                        : service.status === 0
                            ? 'Service check failed'
                            : 'Service check pending',
                    responseTime: (service.report as any)?.lastweek?.avgResponseTime || null
                };
            });

            res.json({
                logs,
                total: logs.length
            });
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving logs", error);
        }
    }

    /**
     * returns detailed logs for all services of the user
     * @route GET /services/logs
     * @access Private
     */
    static async getAllServiceLogs(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }
            const limit = parseInt(req.query.limit as string) || 100;

            // Get all services for the user
            const all_logs = await res.models.Log.find({ user: req.user._id }).lean().limit(limit);
            const logRecords = all_logs.map((logDoc: any) => logDoc.records).flat();
            res.handler.success(res, "All service logs retrieved successfully", {
                logs: logRecords,
                total: logRecords.length

            });
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving all service logs", error);
        }
    }
            

    /**
     * returns detailed logs for a specific service
     * @route GET /services/:serviceId/logs
     * @access Private
     */
    static async getServiceLogs(req: Request, res: Response) {
        try {
            if (!req.user?._id) {
                return res.handler.unAuthorized(res);
            }

            const serviceId = req.params.serviceId as string;
            const limit = parseInt(req.query.limit as string) || 100;

            // Get logs for this service
            const logDoc = await res.models.Log.findOne({ service: serviceId }).populate("service").select('records pings').lean();

            if (!logDoc) {
                return res.handler.success(res, "No logs found for this service");
            }

            const service: any = logDoc.service;

            res.handler.success(res, "Logs retrieved successfully", {
                logs: logDoc.records.slice(-limit),
                total: logDoc.records.length,
                serviceName: service.name || service.url,
                serviceUrl: service.url
            });
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving service logs", error);
        }
    }
}
