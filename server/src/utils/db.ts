import mongoose from "mongoose";
import { appConfig } from "@/config";

async function connectDB() {
    try {
        const _con = await mongoose.connect(appConfig.mongoUri, {
            dbName: 'uptimeclient'
        });
        console.log("Connected to MongoDB");
        return _con;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export { connectDB };