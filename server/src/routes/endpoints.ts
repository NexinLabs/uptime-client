import { Router } from "express";
import authRouter from "./auth";
const endpoints = Router();

endpoints.use("/auth", authRouter);

export default endpoints;
