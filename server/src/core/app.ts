import e from 'express';
import { Logger } from '@/ext/logger';
import { appConfig } from '@/config';
import cookieParser from 'cookie-parser';
import { connectDB } from '@/utils/db';
import endpoints from '@/routes/endpoints';
import { initialMiddleware } from '@/middlewares/initial';
import { securityHeaders } from '@/middlewares/security';
import ServiceMonitor from '@/utils/services/monitor';

const logger = Logger.instance;


export default class UptimeClient {
    public app: e.Application;
    public port: number;

    constructor() {
        this.app = e();
        this.app.set('trust proxy', true);
        this.port = appConfig.port;
    }

    async start() {
        this.app.use(e.json());
        this.app.use(cookieParser());
        this.app.use(e.static('public'));
        this.app.use(e.urlencoded({ extended: true }));
        this.app.use(securityHeaders());
        this.app.use(initialMiddleware);
        this.app.use('/', endpoints);
        this.app.listen(this.port, async () => {
            await connectDB();
            logger.info(`Server is running on  ${appConfig.endpoint}`);
            
            // Initialize service monitor after database connection
            try {
                await ServiceMonitor.initialize();
            } catch (error) {
                logger.error('Failed to initialize ServiceMonitor', error);
            }
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            logger.info('SIGTERM received, shutting down gracefully');
            ServiceMonitor.shutdown();
            process.exit(0);
        });

        process.on('SIGINT', () => {
            logger.info('SIGINT received, shutting down gracefully');
            ServiceMonitor.shutdown();
            process.exit(0);
        });
    }
}
