import { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authAPI } from '@/lib/api';

const VerifySignupPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
          setSuccess(true);
          // Redirect to login after a short delay
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      } catch (err: any) {
        setError(err.message || 'Verification failed. The link may be expired or invalid.');
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

  if (success) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="text-green-400 text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-white mb-2">Account Verified!</h1>
            <p className="text-gray-400">
              Your account has been successfully verified. You can now sign in.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              Redirecting to login page in a few seconds...
            </p>
            <Link to="/login">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <div className="text-red-400 text-6xl mb-4">✗</div>
          <h1 className="text-3xl font-bold text-white mb-2">Verification Failed</h1>
          <p className="text-gray-400">{error}</p>
        </div>

        <div className="space-y-4">
          <Link to="/signup">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200">
              Sign Up Again
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifySignupPage;