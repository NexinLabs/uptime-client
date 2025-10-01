import { Link } from 'react-router-dom';
import { NavBar, Footer } from '@/components/components';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navigation Bar */}
            <NavBar />

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Monitor Your Service <span className="text-indigo-400">24/7</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Get real-time insights into your website's performance and uptime with our advanced monitoring solution
                    </p>
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg 
                     shadow-lg hover:bg-indigo-700 transition-all duration-300 cursor-pointer"
                        >
                            Start Monitoring
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Why Monitoring is Important */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mt-24 bg-gray-800 rounded-2xl p-12"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Why Monitoring is Important</h2>
                    <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto">
                        In today's fast-paced digital world, website downtime can result in significant financial losses, damaged reputation, and lost customer trust. 
                        Effective monitoring ensures your services remain online and performant, allowing you to detect issues early, maintain high availability, 
                        and provide a seamless experience for your users. With real-time alerts and comprehensive analytics, you can stay ahead of potential problems 
                        and keep your business running smoothly.
                    </p>
                </motion.div>

                {/* Why Choose Uptime Client */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-16"
                >
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Uptime Client?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">⏱️</div>
                            <h3 className="text-xl font-semibold mb-4 text-white">Shorter Monitoring Intervals</h3>
                            <p className="text-gray-300">
                                Check your services every 30 seconds for faster detection of downtime and issues, compared to competitors' longer intervals.
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">📈</div>
                            <h3 className="text-xl font-semibold mb-4 text-white">In-Depth & Advanced Analysis</h3>
                            <p className="text-gray-300">
                                Get detailed performance metrics, response time breakdowns, error analysis, and historical trends for comprehensive insights.
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">👥</div>
                            <h3 className="text-xl font-semibold mb-4 text-white">User-Friendly Interface</h3>
                            <p className="text-gray-300">
                                Intuitive dashboards, easy setup, and customizable alerts make monitoring accessible for everyone, from beginners to experts.
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">💰</div>
                            <h3 className="text-xl font-semibold mb-4 text-white">Affordable Rates</h3>
                            <p className="text-gray-300">
                                Starting from just $5/month, our competitive pricing offers premium features without breaking the bank.
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">🔗</div>
                            <h3 className="text-xl font-semibold mb-4 text-white">Seamless Integrations</h3>
                            <p className="text-gray-300">
                                Connect with Slack, Discord, webhooks, and more for instant notifications and automated workflows.
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">🌐</div>
                            <h3 className="text-xl font-semibold mb-4 text-white">Global Monitoring Network</h3>
                            <p className="text-gray-300">
                                Monitor from multiple worldwide locations to ensure your service performs well globally.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-indigo-400 text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Real-time Monitoring</h3>
                        <p className="text-gray-300">
                            Instant notifications and alerts when your website experiences downtime
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-indigo-400 text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Advanced Analytics</h3>
                        <p className="text-gray-300">
                            Comprehensive performance metrics and detailed uptime statistics
                        </p>
                    </div>

                    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                        <div className="text-indigo-400 text-4xl mb-4">🌍</div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Global Coverage</h3>
                        <p className="text-gray-300">
                            Monitor from multiple locations across the globe
                        </p>
                    </div>
                </motion.div>

                {/* Stats Section */}
                <div className="mt-24 bg-gray-800 rounded-2xl p-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400">99.9%</h4>
                            <p className="text-gray-300 mt-2">Uptime Guarantee</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400">24/7</h4>
                            <p className="text-gray-300 mt-2">Monitoring</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400">1M+</h4>
                            <p className="text-gray-300 mt-2">Websites Monitored</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default LandingPage;

