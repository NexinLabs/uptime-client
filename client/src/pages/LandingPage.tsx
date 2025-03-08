
import { NavBar } from '../components/components';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <NavBar/>

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                        Monitor Your Website <span className="text-indigo-600">24/7</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                        Get real-time insights into your website's performance and uptime with our advanced monitoring solution
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg 
                     shadow-lg hover:bg-indigo-700 transition-all duration-300"
                    >
                        Start Monitoring
                    </motion.button>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-indigo-600 text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Real-time Monitoring</h3>
                        <p className="text-gray-600">
                            Instant notifications and alerts when your website experiences downtime
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-indigo-600 text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Advanced Analytics</h3>
                        <p className="text-gray-600">
                            Comprehensive performance metrics and detailed uptime statistics
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-indigo-600 text-4xl mb-4">🌍</div>
                        <h3 className="text-xl font-semibold mb-4 text-gray-900">Global Coverage</h3>
                        <p className="text-gray-600">
                            Monitor from multiple locations across the globe
                        </p>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <div className="mt-24 bg-gray-50 rounded-2xl p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-600">99.9%</h4>
                            <p className="text-gray-600 mt-2">Uptime Guarantee</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-600">24/7</h4>
                            <p className="text-gray-600 mt-2">Monitoring</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-600">1M+</h4>
                            <p className="text-gray-600 mt-2">Websites Monitored</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 mt-24">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h5 className="text-xl font-bold text-gray-900 mb-4">UptimeMonitor</h5>
                            <p className="text-gray-200">Keeping your websites running 24/7</p>
                        </div>
                        <div>
                            <h6 className="text-gray-100 font-semibold mb-4">Product</h6>
                            <ul className="space-y-2 text-gray-600 *:text-gray-500">
                                <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Documentation</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="text-gray-100 font-semibold mb-4">Company</h6>
                            <ul className="space-y-2 text-gray-600 *:text-gray-500">
                                <li><a href="#" className="hover:text-indigo-600">About</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h6 className="text-gray-100 font-semibold mb-4">Legal</h6>
                            <ul className="space-y-2 text-gray-600 *:text-gray-500">
                                <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
                                <li><a href="#" className="hover:text-indigo-600">Security</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2024 UptimeMonitor. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;

