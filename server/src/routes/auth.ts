import { Router } from "express";
import AuthController from "@/controllers/auth";
import { limitrpm, limitrps } from "@/middlewares/security";
const authRouter = Router();

const mailLimit = limitrps(2, 15); // 2 requests per 15 seconds

authRouter.get("/", AuthController.authenticate)
authRouter.post("/login", mailLimit, AuthController.login);
authRouter.get("/login",  AuthController.login);
authRouter.post("/signup", mailLimit, AuthController.signup);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/verify-signup", AuthController.verifySignup);
authRouter.post("/reset-password", AuthController.resetPassword);
authRouter.post("/forgot-password", mailLimit, AuthController.forgotPassword);
authRouter.post("/send-magic-link", mailLimit, AuthController.sendLoginLink);

export default authRouter;
