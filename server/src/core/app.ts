import e from 'express';
import { appConfig } from '@/config';
import cookieParser from 'cookie-parser';
import { connectDB } from '@/utils/db';
import { initialMiddleware } from '@/middlewares/initial';
import { securityHeaders } from '@/middlewares/security';

export default class UptimeClient {
    public app: e.Application;
    public port: number;

    constructor() {
        this.app = e();
        this.port = appConfig.port;
    }

    async start() {
        this.app.use(e.json());
        this.app.use(cookieParser());
        this.app.use(e.static('public'));
        this.app.use(e.urlencoded({ extended: true }));
        this.app.use(securityHeaders());
        this.app.use(initialMiddleware);
        this.app.listen(this.port, () => {
            connectDB();
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
