import "dotenv/config";
import UptimeClient from "@/core/app";

const client = new UptimeClient();
client.start();
