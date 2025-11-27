import { Router } from "express";
import authRouter from "./auth";
import serviceRouter from "./services";
import userRouter from "./user";

// middlewares
import AuthMiddleware from "@/middlewares/auth.middleware";
const endpoints = Router();

endpoints.use("/auth", authRouter);
endpoints.use("/user", AuthMiddleware.isTokenVerified, userRouter);
endpoints.use("/services",  AuthMiddleware.isTokenVerified, serviceRouter);

endpoints.get("/", (req, res) => {
    res.json({ message: "API is running" });
});
export default endpoints;
