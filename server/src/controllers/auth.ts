import { Token } from '@/utils/token';
import { appConfig } from '@/config';
import { Request, Response } from "express";
import { UserVerifyLink } from "@/utils/token";
import { sendMailWithHTML, sendMail } from "@/utils/services/mail";

export default class AuthController {

    static async authenticate(req: Request, res: Response) {
        if (!req.user) {
            return res.handler.unAuthorized(res);
        }
        res.handler.success(res, "User authenticated", { user: req.user });
    }

    static async logout(req: Request, res: Response) {
        res.clearCookie("token", { httpOnly: true, secure: true, path: '/' });
        res.handler.success(res, "User logged out");
    }


    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.handler.badRequest(res, "Email and password are required");
            }
            const user = await res.models.User.findOne({ email });
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            const isMatch = await req.helper.comparePassword(password, user.password);
            if (!isMatch) {
                return res.handler.unAuthorized(res, "Invalid email or password");
            }
            const token = new Token({ _id: String(user._id), name: user.name }).save();

            res.cookie('token', token, { httpOnly: true, secure: true });
            res.handler.success(res, "Login successful", { token });

        } catch (error: any) {
            res.handler.internalServerError(res, error.message);
        }
    }

    static async signup(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const existingUser = await res.models.User.findOne({ email });
            if (existingUser) {
                return res.handler.conflict(res, "User already exists");
            }
            const hashedPassword = await req.helper.hashPassword(password);
            const emailVerificationToken = new UserVerifyLink({name, email, password: hashedPassword}).sign();
            const link = `${appConfig.endpoint}/auth/verify-email?token=${emailVerificationToken}`;

            const html = `<p>Hello ${name || 'Guest'},</p>
            <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
            <a href="${link}">Verify Email</a>`;

            await sendMailWithHTML(email, email, "UptimeClient Account Verification", html);
            res.handler.created(res, "Check your email for verification link.");
        } catch (error) {
            res.handler.error(res, "Error creating user", error);
        }
    }


    static async verifySignup(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.query;
            if (!token || typeof token !== 'string') {
                res.handler.badRequest(res, "Invalid or missing token");
                return;
            }
            const tokenUser = UserVerifyLink.fromToken(token);
            if (!tokenUser || !tokenUser.email) {
                res.handler.badRequest(res, "Invalid token");
                return;
            }

            // Check if user already exists
            const existingUser = await res.models.User.findOne({ email: tokenUser.email });
            if (existingUser) {
                res.handler.conflict(res, "User already exists");
                return;
            }

            // Verify the user's email
            const newUser = new res.models.User({
                name: tokenUser.name,
                email: tokenUser.email,
                password: tokenUser.password
            });
            await newUser.save();
            // Create a token for the new user
            const userToken = new Token({
                _id: String(newUser._id),
                name: newUser.name,
            });

            // Set the token in the response
            res.cookie('token', userToken.save(), { httpOnly: true, secure: true });

            res.handler.success(res, "User verified successfully", { user: userToken.toJSON() });
        } catch (error) {
            console.error("Verification error:", error);
            res.handler.internalServerError(res, "An error occurred during verification");
        }


    }
}