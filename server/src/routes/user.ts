import { Router } from "express";
import UserController from "@/controllers/user";

const userRouter = Router();

userRouter.get("/:id", UserController.getUserProfile);
userRouter.put("/:id/notification", UserController.updateNotification);
userRouter.put("/:id/password", UserController.updatePassword);
userRouter.put("/:id/avatar", UserController.updateAvatar);
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;