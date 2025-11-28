import { Request, Response } from "express";
import { appConfig, oauthConfig, ALLOWED } from "@/config";
import { Token } from "@/utils/token";

interface GoogleTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
    refresh_token?: string;
    id_token?: string;
}

interface GoogleUserProfile {
    sub: string;           // Google user ID
    name: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email: string;
    email_verified: boolean;
}

export default class GoogleCallbackController {

    /** Handle Google OAuth callback 
     * @route GET /auth/callback/google
     * @access Public
     * @description Handles the OAuth callback from Google, exchanges code for tokens,
     *              retrieves user profile, creates/updates user, and redirects to dashboard
    */
    static async handleCallback(req: Request, res: Response) {
        try {
            const { code, error, error_description } = req.query;

            // Handle OAuth errors from Google
            if (error) {
                console.error("Google OAuth error:", error, error_description);
                return res.redirect(`${req.allowedOrigin}/login?error=${encodeURIComponent(String(error_description || error))}`);
            }

            if (!code || typeof code !== "string") {
                return res.redirect(`${req.allowedOrigin}/login?error=missing_code`);
            }

            // Exchange authorization code for tokens
            const tokenResponse = await GoogleCallbackController.exchangeCodeForTokens(code);
            if (!tokenResponse) {
                return res.redirect(`${req.allowedOrigin}/login?error=token_exchange_failed`);
            }

            // Get user profile from Google
            const userProfile = await GoogleCallbackController.getUserProfile(tokenResponse.access_token);
            if (!userProfile) {
                return res.redirect(`${req.allowedOrigin}/login?error=profile_fetch_failed`);
            }

            // Find or create user in database
            let user = await res.models.User.findOne({ email: userProfile.email });

            if (!user) {
                // Create new user with a random password (they'll use OAuth to login)
                const randomPassword = await req.helper.hashPassword(
                    Math.random().toString(36).slice(-16) + Date.now().toString(36)
                );

                user = new res.models.User({
                    name: userProfile.name,
                    email: userProfile.email,
                    password: randomPassword,
                    avatar: userProfile.picture || undefined,
                    token: "" // Will be set below
                });

                const userToken = new Token({ _id: String(user._id), name: user.name });
                user.token = userToken.save();
                await user.save();
            } else {
                // Update existing user's avatar if they don't have one
                if (!user.avatar && userProfile.picture) {
                    user.avatar = userProfile.picture;
                    await user.save();
                }

                // Ensure user has a valid token
                if (!user.token) {
                    const userToken = new Token({ _id: String(user._id), name: user.name });
                    user.token = userToken.save();
                    await user.save();
                }
            }

            // Set authentication cookie
            res.cookie("token", user.token, {
                httpOnly: true,
                secure: appConfig.production,
                sameSite: "lax",
                maxAge: appConfig.JWT_EXPIRATION * 1000 // Convert seconds to milliseconds
            });

            // Redirect to dashboard
            res.redirect(`${req.allowedOrigin}/dashboard`);

        } catch (error: any) {
            console.error("Google OAuth callback error:", error);
            res.redirect(`${req.allowedOrigin}/login?error=oauth_failed`);
        }
    }

    /**
     * Exchange authorization code for access tokens
     */
    private static async exchangeCodeForTokens(code: string): Promise<GoogleTokenResponse | null> {
        try {
            const params = new URLSearchParams({
                code,
                client_id: oauthConfig.google.client_id || "",
                client_secret: oauthConfig.google.client_secret || "",
                redirect_uri: oauthConfig.google.redirect_uris[0],
                grant_type: "authorization_code"
            });

            const response = await fetch(oauthConfig.google.token_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params.toString()
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Token exchange failed:", errorData);
                return null;
            }

            return await response.json() as GoogleTokenResponse;

        } catch (error) {
            console.error("Error exchanging code for tokens:", error);
            return null;
        }
    }

    /**
     * Get user profile from Google using access token
     */
    private static async getUserProfile(accessToken: string): Promise<GoogleUserProfile | null> {
        try {
            const response = await fetch(oauthConfig.google.user_profile, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Failed to fetch user profile:", errorData);
                return null;
            }

            return await response.json() as GoogleUserProfile;

        } catch (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }
    }

    /**
     * Generate Google OAuth authorization URL
     * @route GET /auth/google
     * @access Public
     */
    static getAuthorizationUrl(req: Request, res: Response) {
        const params = new URLSearchParams({
            client_id: oauthConfig.google.client_id || "",
            redirect_uri: oauthConfig.google.redirect_uris[0],
            response_type: "code",
            scope: "openid email profile",
            access_type: "offline",
            prompt: "consent"
        });

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
        res.redirect(authUrl);
    }
}