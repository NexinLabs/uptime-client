import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/components/auth-provider';
import { authAPI } from '@/lib/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isMagicLinkMode, setIsMagicLinkMode] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { login, isLoading } = useAuth();

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
        console.log('Attempting login with:', { email }); // Debug log
        await login(email, password);
        setSuccess('Login successful! Redirecting...');
        console.log('Login successful, should redirect now'); // Debug log
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
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50"
                placeholder="Enter your password"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            {!isMagicLinkMode && (
              <div className="flex items-center">
                <input
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
