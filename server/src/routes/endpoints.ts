import { Router } from "express";
import authRouter from "./auth";
import serviceRouter from "./services";
const endpoints = Router();

endpoints.use("/auth", authRouter);
endpoints.use("/services", serviceRouter);



endpoints.get("/", (req, res) => {
    res.json({ message: "API is running" });
});
export default endpoints;
