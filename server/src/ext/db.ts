import { MONGO_URI, DB_NAME } from "@/ext/config";
import { MongoClient} from "mongodb";


export const client: MongoClient = new MongoClient(MONGO_URI);
export const db = client.db(DB_NAME);
export async function connectToDatabase() {
  await client.connect();
  console.log("Connected to MongoDB");
}

