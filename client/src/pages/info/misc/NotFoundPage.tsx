import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl font-bold text-white mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-300 mb-4">Page Not Found</h2>
                    <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link to="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg 
                                     shadow-lg transition-all duration-300 flex items-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Go Home
                        </motion.button>
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg 
                                 shadow-lg transition-all duration-300 flex items-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Go Back
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-12"
                >
                    <div className="text-gray-500 text-sm">
                        If you believe this is an error, please contact support.
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFoundPage;
