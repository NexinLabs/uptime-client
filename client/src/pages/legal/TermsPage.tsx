import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsPage = () => {
    const sections = [
        {
            title: "Acceptance of Terms",
            content: "By accessing and using UptimeClient's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services."
        },
        {
            title: "Service Description",
            content: "UptimeClient provides website and API monitoring services that check the availability and performance of your online services. We offer real-time monitoring, alerting, and analytics features to help you maintain optimal uptime for your digital properties."
        },
        {
            title: "User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or any other breach of security."
        },
        {
            title: "Acceptable Use",
            content: "You agree not to use our services for any unlawful purposes or in any way that could damage, disable, overburden, or impair our servers or networks. You may not attempt to gain unauthorized access to any services, accounts, or networks connected to our platform."
        },
        {
            title: "Service Availability",
            content: "While we strive to provide 99.9% uptime for our monitoring services, we do not guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time, with or without notice."
        },
        {
            title: "Payment and Billing",
            content: "Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except as required by law. We reserve the right to change our pricing with 30 days' notice to existing customers."
        },
        {
            title: "Data and Privacy",
            content: "Your use of our services is also governed by our Privacy Policy. We collect and use monitoring data, service metadata, and account information as described in our Privacy Policy. You retain ownership of your data and can export or delete it at any time."
        },
        {
            title: "Intellectual Property",
            content: "All content, features, and functionality of UptimeClient, including but not limited to text, graphics, logos, and software, are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws."
        },
        {
            title: "Limitation of Liability",
            content: "To the fullest extent permitted by law, UptimeClient shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our services."
        },
        {
            title: "Termination",
            content: "We may terminate or suspend your account and access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the services will immediately cease."
        },
        {
            title: "Changes to Terms",
            content: "We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service. Your continued use of the service after such modifications constitutes your acceptance of the updated terms."
        },
        {
            title: "Governing Law",
            content: "These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions. Any disputes arising from these terms will be resolved through binding arbitration."
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
                        Terms of Service
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
                        Welcome to UptimeClient. These Terms of Service ("Terms") govern your use of our website monitoring services. By using our services, you agree to comply with these terms. Please read them carefully before proceeding.
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
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-12 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border border-indigo-500/30"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-white">Questions?</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-300">
                        <p>📧 Email: legal@UptimeClient.com</p>
                        <p>🌐 Website: www.UptimeClient.com</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsPage;
