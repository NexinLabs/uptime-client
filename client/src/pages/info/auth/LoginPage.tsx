import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/components/auth-provider';
import { authAPI } from '@/lib/api';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const { login, isLoading } = useAuth();
    const [rememberMe, setRememberMe] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [searchParams] = useSearchParams();

    // Handle OAuth error from URL params
    useEffect(() => {
        const oauthError = searchParams.get('error');
        if (oauthError) {
            const errorMessages: Record<string, string> = {
                'missing_code': 'Authentication failed. Please try again.',
                'token_exchange_failed': 'Failed to authenticate with Google. Please try again.',
                'profile_fetch_failed': 'Failed to get your profile from Google. Please try again.',
                'oauth_failed': 'Google authentication failed. Please try again.',
            };
            setError(errorMessages[oauthError] || decodeURIComponent(oauthError));
        }
    }, [searchParams]);

    const handleGoogleLogin = async () => {
        setIsGoogleLoading(true);
        setError('');
        window.location.href = `${import.meta.env.VITE_API_URL || 'https://api.uptimeclient.tech'}/auth/google`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isMagicLinkMode) {
            try {
                const response = await authAPI.sendMagicLink(email);
                if (response.success) {
                    setShowSuccessDialog(true);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to send login link. Please try again.');
            }
        } else {
            try {
                await login(email, password, rememberMe);
                setSuccess('Login successful! Redirecting...');

            } catch (err: any) {
                console.error('Login error:', err); // Debug log
                setError(err.message || 'Login failed. Please try again.');
            }
        }
    };

    return (
        <div className="bg-gray-900 flex items-center justify-center px-4 min-h-[calc(100vh-200px)]">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-md">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-md">
                            {success}
                        </div>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                            placeholder="Enter your email"
                        />
                    </div>

                    {!isMagicLinkMode && (
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 pr-12"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 disabled:opacity-50"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        {!isMagicLinkMode && (
                            <div className="flex items-center">
                                <input
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    disabled={isLoading}
                                    className="h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500 focus:ring-2 disabled:opacity-50"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                                    Remember me
                                </label>
                            </div>
                        )}

                        {!isMagicLinkMode && (
                            <Link to="/forgot-password" className="text-sm text-indigo-400 hover:text-indigo-300">
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (isMagicLinkMode ? 'Sending Link...' : 'Signing In...') : (isMagicLinkMode ? 'Send Login Link' : 'Sign In')}
                    </Button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setIsMagicLinkMode(!isMagicLinkMode)}
                            className="text-sm text-indigo-400 hover:text-indigo-300"
                        >
                            {isMagicLinkMode ? 'Use password instead' : 'Send login link instead'}
                        </button>
                    </div>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-600"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800 text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        onClick={handleGoogleLogin}
                        disabled={isLoading || isGoogleLoading}
                        className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        {isGoogleLoading ? 'Redirecting...' : 'Continue with Google'}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="bg-gray-800 border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-white text-center text-2xl">Check Your Email</DialogTitle>
                        <DialogDescription className="text-gray-400 text-center">
                            We've sent a login link to {email}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center space-y-4">
                        <div className="text-green-400 text-4xl">✓</div>
                        <p className="text-gray-400 text-sm">
                            Click the link in the email to sign in to your account.
                        </p>
                        <Button
                            onClick={() => setShowSuccessDialog(false)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LoginPage;
