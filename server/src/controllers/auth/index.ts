import { Token } from '@/utils/token';
import { appConfig, ALLOWED } from '@/config';
import { Request, Response } from "express";
import { UserVerifyLink } from "@/utils/token";
import EmailTemplates from '@/assets/email-templates';
import { sendMailWithHTML } from "@/utils/services/mail";


const tokens = {
    login : new Map<string, string>(),
    verifySignup : new Map<string, string>(),
    resetPassword : new Map<string, string>(),
}


export default class AuthController {

    /**Authenticate endpoint
     * @route GET /auth
     * @access Private
     */
    static async authenticate(req: Request, res: Response) {
        res.cookie('support_key', appConfig.DC_WEBHOOK_B64, { httpOnly: true, secure: true, sameSite: 'strict' });
        if (!req.user) {
            return res.handler.unAuthorized(res);
        }
        res.handler.success(res, "User authenticated", req.user );
    }

    /**Logout endpoint
     * @route POST /auth/logout
     * @access Private
     */
    static async logout(req: Request, res: Response) {
        res.clearCookie("token", { httpOnly: true, secure: true, path: '/' });
        res.handler.success(res, "User logged out");
    }


    /**Login endpoint
     * @route POST /auth/login?token=...
     * @access Public
     */
    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const { token } = req.query;

            if (token) {
                if ( !tokens.login.has(String(token))) {
                    return res.handler.badRequest(res, "Invalid or expired token");
                }

                const parsedToken = Token.fromToken(String(token));
                if (!parsedToken || !parsedToken._id) {
                    return res.handler.badRequest(res, "Invalid token");
                }


                const user = await res.models.User.findById(parsedToken._id);
                if (!user || !user._id) {
                    return res.handler.badRequest(res, "Invalid token");
                }

                if (!user.token) {
                    const userToken = new Token({ _id: String(user._id), name: user.name });
                    user.token = userToken.save();
                    await user.save();
                }

                res.cookie('token', user.token, { httpOnly: true, secure: true });

                // Remove used token
                tokens.login.delete(String(token));

                //  redirect to allowed origin's dashboard
                res.redirect(`${ALLOWED.origin}/dashboard`);
                return;
            }

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

            if (!user.token) {
                const userToken = new Token({ _id: String(user._id), name: user.name });
                user.token = userToken.save();
                await user.save();
            }

            res.cookie('token', user.token, { httpOnly: true, secure: true });
            res.handler.success(res, "Login successful", { token: user.token });

        } catch (error: any) {
            res.handler.internalServerError(res, error.message);
        }
    }


    /**Signup endpoint
     * @route POST /auth/signup
     * @access Public
     * @dependency /auth/verify-signup?token=...
     */
    static async signup(req: Request, res: Response) {
        const { name, email, password } = req.body;
        try {
            const existingUser = await res.models.User.findOne({ email });
            if (existingUser) {
                return res.handler.conflict(res, "User already exists");
            }
            const hashedPassword = await req.helper.hashPassword(password);
            const emailVerificationToken = new UserVerifyLink({ name, email, password: hashedPassword }).sign();
            
            // save verification token temporarily
            tokens.verifySignup.set(emailVerificationToken, email);

            const link = `${appConfig.endpoint}/auth/verify-signup?token=${emailVerificationToken}`;

            const _email = EmailTemplates.verifyAccount(name || 'There', link);

            const mailResult = await sendMailWithHTML(email, email, _email.subject, _email.html);
            if (!mailResult.success) {
                tokens.verifySignup.delete(emailVerificationToken);
                return res.handler.error(res, "Failed to send verification email. Please try again later.");
            }
            res.handler.created(res, "Check your email for verification link.");
        } catch (error) {
            res.handler.error(res, "Error creating user", error);
        }
    }



    /**Signup verification endpoint
     * @route GET /auth/verify-signup
     * @access Public
     */
    static async verifySignup(req: Request, res: Response): Promise<void> {
        try {
            const { token } = req.query;

            if (!tokens.verifySignup.has(String(token))) {
                res.handler.badRequest(res, "Invalid or expired token");
                return;
            }

            if (!token || typeof token !== 'string') {
                res.handler.badRequest(res, "Invalid or missing token");
                return;
            }
            const tokenUser = UserVerifyLink.fromToken(token);
            if (!tokenUser || !tokenUser.email) {
                res.handler.badRequest(res, "Invalid token");
                return;
            }

            // Remove used token
            tokens.verifySignup.delete(String(token));

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
            const userToken = new Token({ _id: String(newUser._id), name: newUser.name });
            const tokenString = userToken.save();
            
            newUser.token = tokenString;

            await newUser.save();

            // Set the token in the response
            res.cookie('token', tokenString, { httpOnly: true, secure: true });

            res.handler.success(res, "User verified successfully", { user: userToken.toJSON() });
        } catch (error) {
            res.handler.internalServerError(res, "An error occurred during verification");
        }
    }


    /**Reset password endpoint
     * @route POST /auth/reset-password?token=...
     * @access Public
     */
    static async resetPassword(req: Request, res: Response) {

        const { token } = req.query;
        const { newPassword } = req.body;

        if (!token || typeof token !== 'string') {
            res.handler.badRequest(res, "Invalid or missing token");
            return;
        }

        try {
            const tokenUser = Token.fromToken(String(token));
            if (!tokenUser || !tokenUser._id) {
                res.handler.badRequest(res, "Invalid token");
                return;
            }

            if (!newPassword) {
                return res.handler.badRequest(res, "New password is required");
            }
            const newToken = new Token({ _id: tokenUser._id.toString(), name: tokenUser.name })
            const hashedPassword = await req.helper.hashPassword(newPassword);
            await res.models.User.updateOne({ _id: tokenUser._id }, { 
                password: hashedPassword,
                token: newToken.save()
            });
            res.handler.success(res, "Password reset successful");

        } catch (error) {
            res.handler.internalServerError(res, "An error occurred during password reset", error);
        }
    }


    /**Forgot password endpoint
     * @route POST /auth/forgot-password
     * @access Public
     * @dependency /auth/reset-password?token=...
     */
    static async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;
        try {
            const user = await res.models.User.findOne({ email });
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            const resetToken = new Token({ _id: user._id.toString(), name: user.name }).save();
            
            // save reset password token temporarily
            tokens.resetPassword.set(resetToken, email);

            if (!req.allowedOrigin) {
                return res.handler.error(res, "Invalid request origin");
            }

            const link = `${req.allowedOrigin}/reset-password?token=${resetToken}`;

            const _email = EmailTemplates.forgotPassword(user.name || 'There', link);
            const mailResult = await sendMailWithHTML(email, email, _email.subject, _email.html);
            if (!mailResult.success) {
                tokens.resetPassword.delete(resetToken);
                return res.handler.error(res, "Failed to send password reset email. Please try again later.");
            }
            res.handler.success(res, "Check your email for password reset link.");
        } catch (error) {
            res.handler.error(res, "Error sending password reset link", error);
        }
    }

    /**Login with link endpoint
     * @route POST /auth/send-magic-link
     * @access Public
     * @dependency /auth/login?token=...
     */
    static async sendLoginLink(req: Request, res: Response) {
        // Implementation for login with link
        const { email } = req.body;
        try {
            const user = await res.models.User.findOne({ email });
            if (!user) {
                return res.handler.notFound(res, "User not found");
            }
            const loginToken = new Token({ _id: user._id.toString(), name: user.name }).save();
            
            // save login token temporarily
            tokens.login.set(loginToken,  email);
            
            const link = `${appConfig.endpoint}/auth/login?token=${loginToken}`;

            const _email = EmailTemplates.loginWithLink(user.name || 'There', link);
            const mailResult = await sendMailWithHTML(email, email, _email.subject, _email.html);
            if (!mailResult.success) {
                tokens.login.delete(loginToken);
                return res.handler.error(res, "Failed to send login email. Please try again later.");
            }
            res.handler.success(res, "Check your email for login link.");
        } catch (error) {
            res.handler.error(res, "Error sending login link", error);
        }
    }
}