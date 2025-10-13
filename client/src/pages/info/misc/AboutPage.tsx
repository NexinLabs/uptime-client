
import { motion } from 'framer-motion';

const AboutPage = () => {
    return (
        <div className="bg-gray-900 text-white">

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        About <span className="text-indigo-400">Uptime Client</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        We're on a mission to provide reliable uptime monitoring solutions that help businesses maintain their online presence and deliver exceptional user experiences.
                    </p>
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                            <p className="text-gray-300 text-lg mb-6">
                                In today's digital landscape, downtime can cost businesses thousands of dollars per minute.
                                We believe every website deserves reliable monitoring that alerts you before issues impact your users.
                            </p>
                            <p className="text-gray-300 text-lg">
                                Founded in 2024, Uptime Monitor was created by developers who experienced the frustration of
                                unexpected outages. We built a solution that combines cutting-edge technology with intuitive design.
                            </p>
                        </div>
                        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
                            <div className="text-indigo-400 text-6xl mb-4">🎯</div>
                            <h3 className="text-2xl font-semibold mb-4">Zero Downtime Vision</h3>
                            <p className="text-gray-300">
                                Our goal is to help businesses achieve 99.9% uptime through proactive monitoring,
                                instant alerts, and comprehensive analytics.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                            <p className="text-gray-300">
                                Global monitoring network with response times under 30 seconds
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">🔔</div>
                            <h3 className="text-xl font-semibold mb-4">Smart Alerts</h3>
                            <p className="text-gray-300">
                                Multiple notification channels including email, SMS, and webhooks
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-indigo-400 text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-4">Detailed Analytics</h3>
                            <p className="text-gray-300">
                                Comprehensive uptime statistics and performance insights
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Team Section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mb-20"
                >
                    <h2 className="text-4xl font-bold text-center mb-12">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">👨‍💻</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Alex Johnson</h3>
                            <p className="text-indigo-400 mb-2">CEO & Founder</p>
                            <p className="text-gray-300 text-sm">
                                Former DevOps engineer with 10+ years of experience in system monitoring
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">👩‍🔬</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Sarah Chen</h3>
                            <p className="text-indigo-400 mb-2">CTO</p>
                            <p className="text-gray-300 text-sm">
                                Backend specialist focused on scalable monitoring infrastructure
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <span className="text-4xl">🎨</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Mike Rodriguez</h3>
                            <p className="text-indigo-400 mb-2">Lead Designer</p>
                            <p className="text-gray-300 text-sm">
                                UX/UI expert ensuring our platform is both powerful and easy to use
                            </p>
                        </div>
                    </div>
                </motion.div> */}

                {/* <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="bg-gray-800 rounded-2xl p-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400 mb-2">10K+</h4>
                            <p className="text-gray-300">Websites Monitored</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400 mb-2">99.9%</h4>
                            <p className="text-gray-300">Uptime Guarantee</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400 mb-2">24/7</h4>
                            <p className="text-gray-300">Monitoring</p>
                        </div>
                        <div>
                            <h4 className="text-4xl font-bold text-indigo-400 mb-2">50+</h4>
                            <p className="text-gray-300">Countries Covered</p>
                        </div>
                    </div>
                </motion.div> */}
            </div>
        </div>
    );
};

export default AboutPage;
