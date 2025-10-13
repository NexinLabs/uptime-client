import mongoose from "mongoose";
import { appConfig } from "@/config";
import { Logger } from "@/ext/logger";




async function connectDB() {
    try {
        const _con = await mongoose.connect(appConfig.mongoUri, {
            dbName: 'uptimeclient'
        });
        Logger.instance.info("Connected to MongoDB");
        return _con;
    } catch (error) {
        Logger.instance.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export { connectDB };