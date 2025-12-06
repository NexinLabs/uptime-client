import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PricingPage = () => {

    const plans = [
        {
            name: 'Free',
            price: '₹0',
            period: 'forever',
            description: 'Perfect for getting started',
            features: [
                'Monitor 10 websites',
                '1-minute check intervals',
                'Email notifications',
                '5 Restart Service',
                'Basic uptime statistics',
            ],
            limitations: [
                'Head requests only',
                'Basic support only'
            ],
            buttonText: 'Get Started',
            buttonVariant: 'secondary' as const,
            popular: false
        },
        {
            name: 'Pro',
            price: '₹79',
            period: 'per month',
            description: 'Great for small businesses',
            features: [
                'Monitor up to 50 websites',
                '30-second check intervals',
                'Email notifications',
                '50 Restart Service',
                'Advanced analytics',
                'Multi method request',
                'Priority support'
            ],
            limitations: [],
            buttonText: 'Start Free Trial',
            buttonVariant: 'default' as const,
            popular: true
        }
    ];

    return (
        <div className="bg-black text-white min-h-screen">

            {/* Hero Section */}
            <div className="container mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                        Simple, Transparent <span className="text-indigo-400">Pricing</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Choose the perfect plan for your monitoring needs. All plans include our core features with no hidden fees.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto"
                >
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl p-8 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 border border-gray-700/50 backdrop-blur-sm ${plan.popular ? 'ring-2 ring-indigo-400/50 scale-105' : ''
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-bold mb-4 text-white">{plan.name}</h3>
                                <div className="mb-4">
                                    <span className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">{plan.price}</span>
                                    <span className="text-gray-400 text-lg">/{plan.period}</span>
                                </div>
                                <p className="text-gray-300 text-base">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-base">
                                        <span className="text-green-400 mr-3 text-lg">✓</span>
                                        <span className="text-gray-200">{feature}</span>
                                    </li>
                                ))}
                                {plan.limitations.map((limitation, limitIndex) => (
                                    <li key={limitIndex} className="flex items-center text-base">
                                        <span className="text-red-400 mr-3 text-lg">✗</span>
                                        <span className="text-gray-400">{limitation}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to={plan.name === 'Enterprise' ? '/contact' : `/plans?plan=${plan.name.toLowerCase()}`}>
                                <Button
                                    variant={plan.buttonVariant}
                                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${plan.buttonVariant === 'default'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                            : 'border-2 border-gray-600 hover:bg-gray-700 hover:border-gray-500'
                                        }`}
                                >
                                    {plan.buttonText}
                                </Button>
                            </Link>
                        </div>
                    ))}
                </motion.div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-semibold mb-4 text-white">Can I change plans anytime?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately,
                                and we'll prorate any billing adjustments.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-semibold mb-4 text-white">What payment methods do you accept?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                                All payments are processed securely through Stripe.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-semibold mb-4 text-white">Is there a free trial?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Yes! All paid plans come with a 14-day free trial. No credit card required to start.
                                You can cancel anytime during the trial period.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700/50 backdrop-blur-sm shadow-xl">
                            <h3 className="text-xl font-semibold mb-4 text-white">What happens if I exceed my website limit?</h3>
                            <p className="text-gray-300 leading-relaxed">
                                We'll notify you when you approach your limit. You can either upgrade your plan or
                                remove unused websites to stay within your current plan.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-3xl p-16 shadow-2xl border border-indigo-500/20"
                >
                    <h2 className="text-5xl font-bold mb-6 text-white">Ready to Get Started?</h2>
                    <p className="text-xl mb-10 opacity-90 text-gray-100 leading-relaxed">
                        Join thousands of businesses that trust Uptime Monitor for their website monitoring needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/signup">
                            <Button variant="white" className="text-indigo-600 px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="white-outline" className="px-10 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-white hover:text-indigo-600 transition-all duration-300">
                                Contact Sales
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PricingPage;
