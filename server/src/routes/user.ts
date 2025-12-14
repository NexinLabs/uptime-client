import { Router } from "express";
import UserController from "@/controllers/user";

const userRouter = Router();

userRouter.get("/", UserController.getUserProfile);
userRouter.put("/notification", UserController.updateNotification);
userRouter.put("/password", UserController.updatePassword);
userRouter.put("/avatar", UserController.updateAvatar);
userRouter.delete("/", UserController.deleteUser);

export default userRouter;