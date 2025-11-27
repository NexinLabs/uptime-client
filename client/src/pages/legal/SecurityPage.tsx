import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SecurityPage = () => {
    const sections = [
        {
            title: "Data Encryption",
            content: "All data transmitted between your browser and our servers is encrypted using industry-standard TLS/SSL protocols. We use AES-256 encryption for data at rest, ensuring your monitoring data and account information remain secure."
        },
        {
            title: "Infrastructure Security",
            content: "Our infrastructure is hosted on enterprise-grade cloud platforms with built-in security features, including DDoS protection, intrusion detection systems, and regular security patches. We maintain multiple redundant systems across geographically distributed data centers."
        },
        {
            title: "Access Control",
            content: "We implement strict access controls using role-based permissions and multi-factor authentication. Our team follows the principle of least privilege, ensuring employees only have access to systems and data necessary for their roles."
        },
        {
            title: "Security Monitoring",
            content: "We continuously monitor our systems for security threats using automated tools and manual reviews. Our security operations center (SOC) operates 24/7 to detect and respond to potential security incidents."
        },
        {
            title: "Regular Audits",
            content: "We conduct regular security audits and penetration testing by third-party security experts. Our code undergoes regular security reviews, and we maintain compliance with industry security standards."
        },
        {
            title: "Incident Response",
            content: "We have a comprehensive incident response plan that includes immediate notification procedures, containment strategies, and recovery protocols. In the event of a security incident, affected users will be notified within 72 hours."
        },
        {
            title: "Employee Training",
            content: "All employees undergo regular security awareness training and are required to follow strict security protocols. We conduct background checks on all employees with access to sensitive systems."
        },
        {
            title: "Vulnerability Management",
            content: "We maintain a responsible disclosure program for security researchers and promptly address reported vulnerabilities. Critical security patches are applied within 24 hours of identification."
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
                        Security Policy
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
                        Security is at the core of everything we do at UptimeClient. We employ multiple layers of security measures to protect your data and ensure the integrity of our monitoring services. This page outlines our security practices and commitments.
                    </p>
                </motion.div>

                {/* Security Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-12"
                >
                    <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border border-green-500/30 inline-flex items-center gap-4">
                        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-1">Enterprise-Grade Security</h3>
                            <p className="text-gray-300">ISO 27001 Compliant • SOC 2 Type II</p>
                        </div>
                    </div>
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
                    <h2 className="text-2xl font-semibold mb-4 text-white">Report a Security Issue</h2>
                    <p className="text-gray-300 leading-relaxed mb-4">
                        If you discover a security vulnerability, please report it to us:
                    </p>
                    <div className="space-y-2 text-gray-300">
                        <p>📧 Email: support@uptimeclient.tech</p>
                        <p>🔒 PGP Key: Available upon request</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SecurityPage;
