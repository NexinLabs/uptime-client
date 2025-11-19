import { Request, Response } from "express";


export default class ServiceController {



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

            const services = await res.models.Service.find({
                owner: req.user._id
            }).lean();


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
            const newService = new res.models.Service({ ...req.body, owner: req.user._id });
            await newService.save();
            res.handler.created(res, "Service created successfully", newService);
        } catch (error) {
            res.handler.internalServerError(res, "Error creating service", error);
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
                _id: req.params.serviceId,
                owner: req.user._id
            });
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
                { _id: req.params.serviceId, owner: req.user._id },
                req.body,
                { new: true, runValidators: true }
            );
            if (!service) {
                return res.handler.notFound(res, "Service not found");
            }
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
            const service = await res.models.Service.deleteOne({ _id: req.params.id });
            if (service.deletedCount === 0) {
                return res.handler.notFound(res, "Service not found");
            }
            res.handler.success(res, "Service deleted successfully");
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

            const services = await res.models.Service.find({
                owner: req.user._id
            }).populate('report');

            const totalServices = services.length;

            // Calculate uptime percentage
            const activeServices = services.filter(s => s.status === 1).length;
            const overallUptime = totalServices > 0
                ? ((activeServices / totalServices) * 100).toFixed(1)
                : '0.0';

            // Calculate average response time from reports
            let totalResponseTime = 0;
            let servicesWithReports = 0;

            services.forEach(service => {
                if (service.report && (service.report as any).lastweek?.avgResponseTime) {
                    totalResponseTime += (service.report as any).lastweek.avgResponseTime;
                    servicesWithReports++;
                }
            });

            const avgResponseTime = servicesWithReports > 0
                ? Math.round(totalResponseTime / servicesWithReports)
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

            const services = await res.models.Service.find({
                owner: req.user._id
            }).sort({ lastrun: -1 }).limit(limit).populate('report');

            const logs = services.map(service => ({
                id: service._id,
                serviceName: service.name || service.url,
                url: service.url,
                method: service.method,
                status: service.status === 1 ? 'success' : service.status === 0 ? 'failed' : 'pending',
                statusCode: service.status,
                timestamp: service.lastrun,
                message: service.status === 1
                    ? 'Service check successful'
                    : service.status === 0
                        ? 'Service check failed'
                        : 'Service check pending',
                responseTime: (service.report as any)?.lastweek?.avgResponseTime || null
            }));

            res.json({
                logs,
                total: logs.length
            });
        } catch (error) {
            res.handler.internalServerError(res, "Error retrieving logs", error);
        }
    }
}
