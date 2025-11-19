import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ReviewSection from '../../components/block/ReviewSection';

const AnimatedCounter = ({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const DashboardPreview = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });

    return (
        <div ref={ref} className="w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 15 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
            >
                {/* Dashboard Mockup */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                    {/* Header Bar */}
                    <div className="bg-gray-900/80 px-6 py-4 border-b border-gray-700 flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="ml-4 text-gray-400 text-sm font-mono">UptimeClient</div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 space-y-6">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-lg p-4 border border-green-500/30"
                            >
                                <div className="text-green-400 text-sm mb-1">Uptime</div>
                                <div className="text-2xl font-bold text-white">99.8%</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="bg-gradient-to-br from-blue-500/20 to-indigo-500/10 rounded-lg p-4 border border-blue-500/30"
                            >
                                <div className="text-blue-400 text-sm mb-1">Avg Response</div>
                                <div className="text-2xl font-bold text-white">124ms</div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                className="bg-gradient-to-br from-purple-500/20 to-pink-500/10 rounded-lg p-4 border border-purple-500/30"
                            >
                                <div className="text-purple-400 text-sm mb-1">Services</div>
                                <div className="text-2xl font-bold text-white">12</div>
                            </motion.div>
                        </div>

                        {/* Service Status List */}
                        <div className="space-y-3">
                            {[
                                { name: 'API Gateway', status: 'up', response: '89ms' },
                                { name: 'Database Service', status: 'up', response: '156ms' },
                                { name: 'Auth Service', status: 'up', response: '45ms' },
                            ].map((service, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                                    className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-between border border-gray-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-white font-medium">{service.name}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-400 text-sm">{service.response}</span>
                                        <span className="text-green-400 text-sm font-semibold">ONLINE</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Mini Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                        >
                            <div className="flex items-end justify-between h-20 gap-1">
                                {[65, 70, 68, 75, 72, 80, 78, 85, 82, 88, 90, 87, 92, 89, 95].map((height, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={isInView ? { height: `${height}%` } : { height: 0 }}
                                        transition={{ duration: 0.5, delay: 1 + i * 0.05 }}
                                        className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t"
                                    />
                                ))}
                            </div>
                            <div className="text-gray-400 text-xs mt-2 text-center">Response Time (Last 15 checks)</div>
                        </motion.div>
                    </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                </div>
            </motion.div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: string; title: string; description: string; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay }}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl 
                       transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-indigo-500"
        >
            <div className="text-indigo-400 text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </motion.div>
    );
};

const ProgressBar = ({ label, percentage, delay }: { label: string; percentage: number; delay: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="mb-6">
            <div className="flex justify-between mb-2">
                <span className="text-gray-300 font-medium">{label}</span>
                <span className="text-indigo-400 font-semibold">{percentage}%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay, ease: "easeOut" }}
                />
            </div>
        </div>
    );
};

const LandingPage = () => {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.35], [1, 0.8, 0]);

    return (
        <div className="bg-gray-900 text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Hero Section */}
            <motion.div
                style={{ y: heroY, opacity: heroOpacity }}
                className="container mx-auto px-6 py-16 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Monitor Your Service{' '}
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                            24/7
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Get real-time insights into your website's performance and uptime with our advanced monitoring solution
                    </motion.p>
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-lg 
                                     shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer
                                     relative overflow-hidden group"
                        >
                            <span className="relative z-10">Start Monitoring</span>
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"
                                initial={{ x: "100%" }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.button>
                    </Link>
                </motion.div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-16"
                >
                    <DashboardPreview />
                    <p className="text-center text-gray-400 mt-6 text-lg">Experience our intuitive dashboard interface</p>
                </motion.div>
            </motion.div>

            {/* Why Monitoring is Important */}
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-12 border border-gray-700"
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-white">Why Monitoring is Important</h2>
                    <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto mb-8">
                        In today's fast-paced digital world, website downtime can result in significant financial losses, damaged reputation, and lost customer trust.
                        Effective monitoring ensures your services remain online and performant, allowing you to detect issues early, maintain high availability,
                        and provide a seamless experience for your users.
                    </p>

                    {/* Performance Metrics */}
                    <div className="mt-8 max-w-2xl mx-auto">
                        <ProgressBar label="Uptime Reliability" percentage={99} delay={0.2} />
                        <ProgressBar label="Response Time" percentage={95} delay={0.4} />
                        <ProgressBar label="Error Detection" percentage={98} delay={0.6} />
                        <ProgressBar label="Customer Satisfaction" percentage={97} delay={0.8} />
                    </div>
                </motion.div>

                {/* Why Choose Uptime Client */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-16"
                >
                    <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Choose Uptime Client?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="⏱️"
                            title="Shorter Monitoring Intervals"
                            description="Check your services every 30 seconds for faster detection of downtime and issues, compared to competitors' longer intervals."
                            delay={0.1}
                        />
                        <FeatureCard
                            icon="📈"
                            title="In-Depth & Advanced Analysis"
                            description="Get detailed performance metrics, response time breakdowns, error analysis, and historical trends for comprehensive insights."
                            delay={0.2}
                        />
                        <FeatureCard
                            icon="👥"
                            title="User-Friendly Interface"
                            description="Intuitive dashboards, easy setup, and customizable alerts make monitoring accessible for everyone, from beginners to experts."
                            delay={0.3}
                        />
                        <FeatureCard
                            icon="💰"
                            title="Affordable Rates"
                            description="Starting from just ₹79/month, with a lifetime free plan, our competitive pricing offers premium features without breaking the bank."
                            delay={0.4}
                        />
                        <FeatureCard
                            icon="🔗"
                            title="Seamless Integrations"
                            description="Connect with Slack, Discord, webhooks, and more for instant notifications and automated workflows."
                            delay={0.5}
                        />
                        <FeatureCard
                            icon="🌐"
                            title="Global Monitoring Network"
                            description="Monitor from multiple worldwide locations to ensure your service performs well globally."
                            delay={0.6}
                        />
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    <FeatureCard
                        icon="⚡"
                        title="Real-time Monitoring"
                        description="Instant notifications and alerts when your website experiences downtime"
                        delay={0.2}
                    />
                    <FeatureCard
                        icon="📊"
                        title="Advanced Analytics"
                        description="Comprehensive performance metrics and detailed uptime statistics"
                        delay={0.4}
                    />
                    <FeatureCard
                        icon="🌍"
                        title="Global Coverage"
                        description="Monitor from multiple locations across the globe"
                        delay={0.6}
                    />
                </motion.div>



                {/* Reviews Section */}
                <ReviewSection />


                {/* Stats Section with Animated Counters */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-12 border border-indigo-500/30"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                                <AnimatedCounter end={99} suffix=".9%" />
                            </h4>
                            <p className="text-gray-300 mt-2">Uptime Guarantee</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                                24/7
                            </h4>
                            <p className="text-gray-300 mt-2">Monitoring</p>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                                <AnimatedCounter end={100} suffix="+" />
                            </h4>
                            <p className="text-gray-300 mt-2">Websites Monitored</p>

                        </motion.div>
                    </div>
                </motion.div>


                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mt-24 mb-16 text-center"
                >
                    <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
                    <p className="text-gray-300 mb-8 text-lg">Join thousands of users monitoring their services with confidence</p>
                    <Link to="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-12 py-4 rounded-lg 
                                     shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 cursor-pointer text-lg"
                        >
                            Start Your Free Trial
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default LandingPage;