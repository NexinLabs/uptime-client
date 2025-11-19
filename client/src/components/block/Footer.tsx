import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
    const currentYear = new Date().getFullYear();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 via-gray-900 to-black mt-auto relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
                >
                    {/* Brand Section */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">U</span>
                            </div>
                            <h5 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                                UptimeClient
                            </h5>
                        </div>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                            Keeping your websites running 24/7 with advanced monitoring and instant alerts.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <motion.a
                                href="https://github.com/nexinlabs"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 
                                         rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-transparent"
                            >
                                <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 
                                         rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-transparent"
                            >
                                <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 
                                         rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-transparent"
                            >
                                <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="https://linkedin.com/company/nexinlabs"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 
                                         rounded-lg flex items-center justify-center transition-all duration-300 border border-gray-700 hover:border-transparent"
                            >
                                <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div variants={itemVariants}>
                        <h6 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                            Product
                        </h6>
                        <ul className="space-y-3">
                            {[
                                { label: 'About', to: '/about' },
                                { label: 'Pricing', to: '/pricing' },
                                { label: 'Documentation', to: '#' },
                                { label: 'Features', to: '/' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-indigo-400 group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Links Section */}
                    <motion.div variants={itemVariants}>
                        <h6 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                            Links
                        </h6>
                        <ul className="space-y-3">
                            {[
                                { label: 'Dashboard', to: '/dashboard' },
                                { label: 'Log In', to: '/login' },
                                { label: 'Sign Up', to: '/signup' },
                                { label: 'Contact', to: '/contact' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-indigo-400 group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Section */}
                    <motion.div variants={itemVariants}>
                        <h6 className="text-white font-semibold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full" />
                            Legal
                        </h6>
                        <ul className="space-y-3">
                            {[
                                { label: 'Privacy Policy', to: '/privacy' },
                                { label: 'Terms of Service', to: '/terms' },
                                { label: 'Security', to: '/security' },
                                { label: 'Cookies', to: '/cookies' }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.to}
                                        className="text-gray-400 hover:text-indigo-400 transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-0 h-px bg-indigo-400 group-hover:w-4 transition-all duration-300" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="border-t border-gray-800/50 pt-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} UptimeClient. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                            {/* <span className="text-gray-500">
                                Made with <span className="text-red-500 animate-pulse">❤</span> by NexinLabs
                            </span> */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-gray-400 text-xs">All systems operational</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Bottom Border */}
            <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </footer>
    );
}

export default Footer;