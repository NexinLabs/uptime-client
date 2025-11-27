import type { Request, Response, NextFunction } from "express";

export default class AuthMiddleware {
    static async isTokenVerified(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;  
            if (!user || !user._id) {
                return res.handler.unAuthorized(res, "Unauthorized: Invalid or missing token");
            }
            next();
        } catch (error) {
            return res.handler.error(res, "Server error", error);
        }
    }
}

