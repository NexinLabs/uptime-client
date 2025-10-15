import { Router } from "express";
import authRouter from "./auth";
const endpoints = Router();

endpoints.use("/auth", authRouter);



endpoints.get("/", (req, res) => {
    res.json({ message: "API is running" });
});
export default endpoints;
