import { Request, Response } from "express";


export default class AuthController {



    static async authenticate(req: Request, res: Response) {
        if (!req.user) {
            return res.handler.unAuthorized(res);
        }
        res.handler.success(res, "User authenticated", { user: req.user });
    }

    static async logout(req: Request, res: Response) {
        res.clearCookie("token", { httpOnly: true, secure: true, path: '/' });
        res.handler.success(res, "User logged out");
    }

    static async signup(req: Request, res: Response) {
        const { name, email, password } = req.body;
        
    }
}