import express from 'express';
import { appConfig } from '@/config';
import { initialMiddleware } from '@/middlewares/initial';


export default class UptimeClient {
    public app: express.Application;
    public port: number;


    constructor() {
        this.app = express();
        this.port = appConfig.port;
    }

    async start() {
        this.app.use(initialMiddleware);
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
