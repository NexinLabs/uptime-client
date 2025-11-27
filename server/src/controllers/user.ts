import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcrypt";

export default class UserController {
    /**
     * Get user profile by ID
     * @route GET /user/:id
     * @access Private
     */

    static async getUserProfile(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId).select("-password -token");
            
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            
            return res.handler.success(res, "User profile fetched", user);
        } catch (error) {
            return res.handler.error(res, "Server error", error);
        }
    }

    static async updateNotification(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { email, sms, push } = req.body;
            
            const user = await User.findByIdAndUpdate(
                userId,
                { notification: { email, sms, push } },
                { new: true }
            ).select("-password -token");
            
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            
            return res.handler.success(res, "Notification preferences updated", user);
        } catch (error) {
            return res.handler.error(res, "Server error", error);
        }
    }

    static async updatePassword(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { currentPassword, newPassword } = req.body;
            
            const user = await User.findById(userId);
            
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            
            const isMatch = await req.helper.comparePassword(currentPassword, user.password);
            
            if (!isMatch) {
                return res.handler.badRequest(res, "Current password is incorrect");
            }
            
            const hashedPassword = await req.helper.hashPassword(newPassword);
            user.password = hashedPassword;
            await user.save();
            
            return res.handler.success(res, "Password updated successfully");
        } catch (error) {
            return res.handler.error(res, "Server error", error);
        }
    }

    static async updateAvatar(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const { avatar } = req.body;
            
            const user = await User.findByIdAndUpdate(
                userId,
                { avatar },
                { new: true }
            ).select("-password -token");
            
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            
            return res.handler.success(res, "Avatar updated", user);
        } catch (error) {
            return res.handler.error(res, "Server error", error);
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            
            const user = await User.findByIdAndDelete(userId);
            
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            
            return res.handler.success(res, "User deleted successfully");
        } catch (error) {
            return res.handler.error(res, "Server error", error);
        }
    }
}