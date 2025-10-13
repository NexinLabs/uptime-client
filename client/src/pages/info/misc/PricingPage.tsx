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
                'Basic uptime statistics',
                '7-day data retention'
            ],
            limitations: [
                'Head requests only',
                'No API access',
                'Basic support only'
            ],
            buttonText: 'Get Started',
            buttonVariant: 'secondary' as const,
            popular: false
        },
        {
            name: 'Basic',
            price: '₹79',
            period: 'per month',
            description: 'Great for small businesses',
            features: [
                'Monitor up to 15 websites',
                '50-second check intervals',
                'Email notifications',
                'Advanced analytics',
                '30-day data retention',
                'API access',
                'Priority support'
            ],
            limitations: [],
            buttonText: 'Start Free Trial',
            buttonVariant: 'default' as const,
            popular: true
        },
        {
            name: 'Pro',
            price: '₹149',
            period: 'per month',
            description: 'For growing businesses',
            features: [
                'Monitor up to 25 websites',
                '30-second check intervals',
                'Email notifications',
                'Real-time dashboards',
                '30-day data retention',
                'Custom integrations',
                'Phone support',
                'SLA guarantee'
            ],
            limitations: [],
            buttonText: 'Start Free Trial',
            buttonVariant: 'default' as const,
            popular: false
        },
        {
            name: 'Enterprise',
            price: '₹499',
            period: 'per month',
            description: 'For large organizations',
            features: [
                'Unlimited websites',
                '10-second check intervals',
                'Email notifications',
                'Custom dashboards',
                '1-year data retention',
                'White-label solution',
                'Dedicated account manager',
                '99.9% SLA guarantee',
                'Custom integrations'
            ],
            limitations: [],
            buttonText: 'Contact Sales',
            buttonVariant: 'secondary' as const,
            popular: false
        }
    ];

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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
                >
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-indigo-400 scale-105' : ''
                                }`}
                        >
                            {/* {plan.popular && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-indigo-400 text-gray-900 px-4 py-1 rounded-full text-sm font-semibold">
                                        Most Popular
                                    </span>
                                </div>
                            )} */}

                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="mb-2">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-gray-400">/{plan.period}</span>
                                </div>
                                <p className="text-gray-300 text-sm">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li key={featureIndex} className="flex items-center text-sm">
                                        <span className="text-green-400 mr-2">✓</span>
                                        <span className="text-gray-300">{feature}</span>
                                    </li>
                                ))}
                                {plan.limitations.map((limitation, limitIndex) => (
                                    <li key={limitIndex} className="flex items-center text-sm">
                                        <span className="text-red-400 mr-2">✗</span>
                                        <span className="text-gray-400">{limitation}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link to={plan.name === 'Enterprise' ? '/contact' : `/plans?plan=${plan.name.toLowerCase()}`}>
                                <Button
                                    variant={plan.buttonVariant}
                                    className={`w-full ${plan.buttonVariant === 'default'
                                            ? 'bg-indigo-600 hover:bg-indigo-700'
                                            : 'border-gray-600 hover:bg-gray-700'
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
                    <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4">Can I change plans anytime?</h3>
                            <p className="text-gray-300">
                                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately,
                                and we'll prorate any billing adjustments.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4">What payment methods do you accept?</h3>
                            <p className="text-gray-300">
                                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                                All payments are processed securely through Stripe.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4">Is there a free trial?</h3>
                            <p className="text-gray-300">
                                Yes! All paid plans come with a 14-day free trial. No credit card required to start.
                                You can cancel anytime during the trial period.
                            </p>
                        </div>

                        <div className="bg-gray-800 rounded-xl p-6">
                            <h3 className="text-xl font-semibold mb-4">What happens if I exceed my website limit?</h3>
                            <p className="text-gray-300">
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
                    className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12"
                >
                    <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of businesses that trust Uptime Monitor for their website monitoring needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/signup">
                            <Button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-3">
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-3">
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
