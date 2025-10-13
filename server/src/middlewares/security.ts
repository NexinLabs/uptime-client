import cors from "cors";
import { ALLOWED } from "@/config";
import rateLimit from "express-rate-limit";

export function limitrpm(rate: number, minutes: number) {
    return rateLimit({
        windowMs: minutes * 60 * 1000, // minutes to milliseconds
        max: rate, // limit each IP to 'rate' requests per windowMs
    });
}

export function limitrps(rate: number, seconds: number) {
    return rateLimit({
        windowMs: seconds * 1000, // seconds to milliseconds
        max: rate, // limit each IP to 'rate' requests per windowMs
    });
}

// security middleware: CORS and rate limiting
export function securityHeaders() {
    // CORS middleware
    const corsMiddleware = cors({
        origin: ALLOWED.origin, 
        methods: ALLOWED.methods,
        credentials: ALLOWED.credentials, // Must be true for cookies
        allowedHeaders: ALLOWED.allowedHeaders,

    });

    // Rate limiting middleware
    const limiter = rateLimit({
        windowMs: 1 * 60 * 1000, // 1 minute
        max: 150, // limit each IP to 150 requests per windowMs
    });

    // Combine both middlewares
    return [corsMiddleware, limiter];
}