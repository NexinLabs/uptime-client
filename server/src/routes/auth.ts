import { Router } from "express";
import AuthController from "@/controllers/auth";

const authRouter = Router();

authRouter.get("/", AuthController.authenticate)
authRouter.post("/login", AuthController.login);
authRouter.get("/login", AuthController.login);
authRouter.post("/signup", AuthController.signup);
authRouter.post("/logout", AuthController.logout);
authRouter.get("/verify-signup", AuthController.verifySignup);
authRouter.get("/reset-password", AuthController.resetPassword);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/send-magic-link", AuthController.sendLoginLink);

export default authRouter;
