import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
    const sections = [
        {
            title: "Information We Collect",
            content: "We collect information that you provide directly to us, including when you create an account, use our monitoring services, or contact us for support. This may include your name, email address, payment information, and website URLs you wish to monitor."
        },
        {
            title: "How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, respond to your comments and questions, and protect against fraudulent or illegal activity."
        },
        {
            title: "Information Sharing",
            content: "We do not sell, trade, or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, conducting our business, or servicing you, as long as those parties agree to keep this information confidential."
        },
        {
            title: "Data Security",
            content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. We use encryption, secure servers, and regular security assessments to safeguard your information."
        },
        {
            title: "Data Retention",
            content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it."
        },
        {
            title: "Your Rights",
            content: "You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. To exercise these rights, please contact us at support@uptimeclient.tech. We will respond to your request within 30 days."
        },
        {
            title: "Cookies and Tracking",
            content: "We use cookies and similar tracking technologies to collect information about your browsing activities. You can control cookies through your browser settings. For more details, please see our Cookie Policy."
        },
        {
            title: "Changes to This Policy",
            content: "We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the 'Last Updated' date. We encourage you to review this policy periodically."
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
                        Privacy Policy
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
                    <p className="text-gray-300 leading-relaxed">
                        At UptimeClient, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website monitoring services. Please read this policy carefully to understand our practices regarding your personal data.
                    </p>
                </motion.div>

                {/* Sections */}
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                            className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-indigo-500/50 transition-colors"
                        >
                            <h2 className="text-2xl font-semibold mb-4 text-white flex items-center gap-3">
                                <span className="w-2 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                                {section.title}
                            </h2>
                            <p className="text-gray-300 leading-relaxed">{section.content}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border border-indigo-500/30"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-300">
                        <p>📧 Email: support@uptimeclient.tech</p>
                        <p>🌐 Website: uptimeclient.tech</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPage;
