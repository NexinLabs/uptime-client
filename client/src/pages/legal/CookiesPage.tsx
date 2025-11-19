import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CookiesPage = () => {
    const cookieTypes = [
        {
            title: "Essential Cookies",
            description: "These cookies are necessary for the website to function and cannot be disabled. They enable core functionality such as security, network management, and accessibility.",
            examples: ["Session management", "Authentication tokens", "Security tokens", "Load balancing"]
        },
        {
            title: "Performance Cookies",
            description: "These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.",
            examples: ["Page load times", "Error tracking", "Performance metrics", "User flow analysis"]
        },
        {
            title: "Functional Cookies",
            description: "These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.",
            examples: ["Language preferences", "Theme selection", "Dashboard layout", "Notification settings"]
        },
        {
            title: "Analytics Cookies",
            description: "We use analytics cookies to understand how you use our service and to improve your experience.",
            examples: ["Usage statistics", "Feature adoption", "User engagement", "A/B testing"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                        Cookie Policy
                    </h1>
                    <p className="text-gray-400 text-lg">Last Updated: November 19, 2025</p>
                    <Link to="/" className="inline-block mt-4 text-indigo-400 hover:text-indigo-300 transition-colors">
                        ← Back to Home
                    </Link>
                </motion.div>

                {/* Introduction */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-8 border border-gray-700"
                >
                    <p className="text-gray-300 leading-relaxed mb-4">
                        UptimeClient uses cookies and similar tracking technologies to enhance your experience on our platform. This Cookie Policy explains what cookies are, how we use them, and how you can manage your cookie preferences.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                        By continuing to use our services, you consent to our use of cookies as described in this policy.
                    </p>
                </motion.div>

                {/* What are Cookies */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                        What are Cookies?
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                        Cookies are small text files that are stored on your device when you visit a website. They help websites remember information about your visit, such as your preferred language and other settings, to make your next visit easier and the site more useful to you.
                    </p>
                </motion.div>

                {/* Cookie Types */}
                <div className="space-y-6 mb-8">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">Types of Cookies We Use</h2>
                    {cookieTypes.map((type, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-colors"
                        >
                            <h3 className="text-xl font-semibold mb-3 text-white flex items-center gap-3">
                                <span className="w-2 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                                {type.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">{type.description}</p>
                            <div className="bg-gray-900/50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-indigo-400 mb-2">Examples:</h4>
                                <ul className="grid grid-cols-2 gap-2">
                                    {type.examples.map((example, i) => (
                                        <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                                            {example}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Managing Cookies */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                        Managing Your Cookie Preferences
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        Most web browsers automatically accept cookies, but you can modify your browser settings to decline cookies if you prefer. Here's how:
                    </p>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-indigo-400 font-bold">•</span>
                            <span><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</span>
                        </li>
                    </ul>
                    <p className="text-gray-400 text-sm mt-4">
                        Note: Disabling cookies may affect your ability to use certain features of our service.
                    </p>
                </motion.div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border border-indigo-500/30"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-white">Questions About Cookies?</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        If you have any questions about our use of cookies, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-300">
                        <p>📧 Email: privacy@UptimeClient.com</p>
                        <p>🌐 Website: www.UptimeClient.com</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CookiesPage;
