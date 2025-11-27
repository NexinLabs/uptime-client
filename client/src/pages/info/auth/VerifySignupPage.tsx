import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { authAPI } from '@/lib/api';

const VerifySignupPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Invalid verification link. No token provided.');
            setLoading(false);
            return;
        }

        const verifyAccount = async () => {
            try {
                const response = await authAPI.verifySignup(token);
                if (response.success) {
                    setShowSuccessDialog(true);
                    // Redirect after dialog
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                }
            } catch (err: any) {
                setError(err.message || 'Verification failed. The link may be expired or invalid.');
                setShowErrorDialog(true);
            } finally {
                setLoading(false);
            }
        };

        verifyAccount();
    }, [searchParams, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                    <div className="mb-8">
                        <div className="animate-spin text-indigo-400 text-6xl mb-4">⟳</div>
                        <h1 className="text-3xl font-bold text-white mb-2">Verifying Account</h1>
                        <p className="text-gray-400">Please wait while we verify your account...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                {loading && (
                    <>
                        <div className="mb-8">
                            <div className="animate-spin text-indigo-400 text-6xl mb-4">⟳</div>
                            <h1 className="text-3xl font-bold text-white mb-2">Verifying Account</h1>
                            <p className="text-gray-400">Please wait while we verify your account...</p>
                        </div>
                    </>
                )}

                {!loading && !showSuccessDialog && !showErrorDialog && (
                    <div className="mb-8">
                        <div className="text-red-400 text-6xl mb-4">✗</div>
                        <h1 className="text-3xl font-bold text-white mb-2">Verification Failed</h1>
                        <p className="text-gray-400">{error}</p>
                    </div>
                )}
            </div>

            <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
                <DialogContent className="bg-gray-800 border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-white text-center text-2xl">Account Verified!</DialogTitle>
                        <DialogDescription className="text-gray-400 text-center">
                            Your account has been successfully verified. You can now sign in.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center space-y-4">
                        <div className="text-green-400 text-4xl">✓</div>
                        <p className="text-gray-400 text-sm">
                            Redirecting to login page in a few seconds...
                        </p>
                        <Link to="/login">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                Go to Login
                            </Button>
                        </Link>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
                <DialogContent className="bg-gray-800 border-gray-700">
                    <DialogHeader>
                        <DialogTitle className="text-white text-center text-2xl">Verification Failed</DialogTitle>
                        <DialogDescription className="text-gray-400 text-center">
                            {error}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="text-center space-y-4">
                        <div className="text-red-400 text-4xl">✗</div>
                        <div className="flex gap-2">
                            <Link to="/signup" className="flex-1">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                                    Sign Up Again
                                </Button>
                            </Link>
                            <Link to="/login" className="flex-1">
                                <Button variant="outline" className="w-full">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default VerifySignupPage;