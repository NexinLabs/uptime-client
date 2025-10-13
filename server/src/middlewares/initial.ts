import mongoose from "mongoose";
import models from "@/models/index.models";
import { ResponseHandler } from "@/ext/response";
import { Logger } from "@/ext/logger";
import { Token } from "@/utils/token";
import Sanitizer from "@/ext/sanitizer";
import Helper from "@/utils/helper";
import type { Request, Response, NextFunction } from "express";



declare module 'express-serve-static-core' {
    interface Application {
        db: typeof mongoose;
        models: typeof models;
    }
    interface Request {
        helper : typeof Helper;
        fullUrl?: string;
        user: Token | null;
        sanitizer: typeof Sanitizer;
    }
    interface Response {
        handler: ResponseHandler;
        logger: Logger;
        models: typeof models;
    }
}


async function initializeUser(req: Request, res: Response, next: NextFunction) {
    
    try {
        const _token : string = req.headers.authorization?.split(' ')[1] || req.cookies?.token || null;
        const user = Token.fromToken(_token);
        req.user = user;
    } catch (err) {
        req.user = null;
    }
    next();
}



export async function initialMiddleware(req: Request, res: Response, next: NextFunction) {
    res.handler = new ResponseHandler();
    req.sanitizer =  Sanitizer;
    req.helper = Helper;
    res.logger = Logger.instance;
    req.app.models = models;
    res.models = models;
    req.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    await initializeUser(req, res, next);
}