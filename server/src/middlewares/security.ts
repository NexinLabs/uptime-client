import cors from "cors";
import { ALLOWED } from "@/config";
import rateLimit from "express-rate-limit";


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