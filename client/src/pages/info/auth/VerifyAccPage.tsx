import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const VerifyAccPage = () => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle verification logic here
    console.log('Verification code:', code);
  };

  const handleResend = () => {
    // Handle resend logic here
    console.log('Resend verification code');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Account</h1>
          <p className="text-gray-400">We've sent a verification code to your email</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-300 mb-2">
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-2xl tracking-widest"
              placeholder="000000"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            Verify Account
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <p className="text-gray-400">
            Didn't receive the code?{' '}
            <button
              onClick={handleResend}
              className="text-indigo-400 hover:text-indigo-300 font-medium underline"
            >
              Resend
            </button>
          </p>
          <p className="text-gray-400">
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccPage;
