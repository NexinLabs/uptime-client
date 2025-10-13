import { Response } from "express";
import { debug } from "@/config";
import Logger  from "./logger";

const logger = Logger.instance;



class ResponseHandler{

    async  forbidden(res: Response, message: any = "Forbidden", data : any = {}) {
        res.status(403).json({
            status: 403,
            message: message,
            data : data
        });
    }

    async conflict(res: Response, message: any = "Resource Conflict", data : any = {}) {
        res.status(409).json({
            status: 409,
            message: message,
            data : data
        });
    }

    async  notFound(res: Response, message: any = "Not Found", data : any = {}) {
        res.status(404).json({
            status: 404,
            message: message,
            data : data
        });
    }

    async  internalServerError(res: Response, message: any = "Internal Server Error", data : any = {}) {
        res.status(500).json({
            status: 500,
            message: message,
            data : data
        });
        debug.controllerError && logger.error("Internal Server Error:", data);
    }

    /** same as internalServerError*/
    async  error(res: Response, message: any = "Internal Server Error", data : any = {}) {
        res.status(500).json({
            status: 500,
            message: message,
            data : data
        });
        
        debug.controllerError && logger.error("Internal Server Error:", data);
    }

    async  success(res: Response, message: any = "Success", data : any = {}) {
        res.status(200).json({
            status: 200,
            message: message,
            data : data
        });
    }

    async  created(res: Response, message: any = "Resource Created", data : any = {}) {
        res.status(201).json({
            status: 201,
            message: message,
            data : data
        });
    }

    async  nodata(res: Response, message: any = "No data") {
        res.status(204).json({
            status: 204,
            message: message
        });
    }

    async  notModified(res: Response, message: any = "Not Modified") {
        res.status(304).json({
            status: 304,
            message: message
        });
    }

    async  badRequest(res: Response, message: any = "Bad Request", data : any = {}) {
        res.status(400).json({
            status: 400,
            message: message,
            data : data
        });
    }

    async  unAuthorized(res: Response, message: any = "Unauthorized", data : any = {}) {
        res.status(401).json({
            status: 401,
            message: message,
            data : data
        });
    }
}

export {
    ResponseHandler
}