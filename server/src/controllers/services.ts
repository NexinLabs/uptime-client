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
                user: req.user._id
            });
            res.json(services);
        } catch (error) {
            res.status(500).json({ message: "Error retrieving services" });
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
            const newService = new res.models.Service(req.body);
            await newService.save();
            res.status(201).json(newService);
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
            res.json(service);
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
            res.json(service);
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
            const service = await res.models.Service.findOneAndDelete({
                _id: req.params.serviceId,
                owner: req.user._id
            });
            if (!service) {
                return res.handler.notFound(res, "Service not found");
            }
            res.handler.success(res, "Service deleted successfully");
        } catch (error) {
            res.handler.internalServerError(res, "Error deleting service", error);
        }
    }
}
