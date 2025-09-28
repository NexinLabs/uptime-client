import { appConfig } from "@/config";
import { MongoClient} from "mongodb";


export const client: MongoClient = new MongoClient(appConfig.mongoUri);
export const db = client.db();
export async function connectToDatabase() {
  await client.connect();
  console.log("Connected to MongoDB");
}

