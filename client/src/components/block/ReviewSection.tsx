import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    role: string;
    rating: number;
    review: string;
    source: string;
    sourceUrl: string;
}

// Static data - will be replaced with API data later
const staticReviews: Review[] = [
    {
        id: 1,
        name: "Sarah Johnson",
        role: "DevOps Engineer",
        rating: 5,
        review: "Game-Changer for Our Operations\n\nUptime Client has transformed how we monitor our infrastructure. The real-time monitoring and instant alerts have helped us maintain 99.9% uptime. The interface is intuitive and the analytics provide exactly what we need to make informed decisions.",
        source: "G2.com",
        sourceUrl: "https://www.g2.com"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "CTO",
        rating: 5,
        review: "Best Monitoring Solution We've Tried\n\nWe evaluated several monitoring tools, but Uptime Client stood out with its robust features and reliability. The detailed reports and notification system have significantly improved our incident response time. Highly recommended for any serious operation.",
        source: "Trustpilot.com",
        sourceUrl: "https://www.trustpilot.com"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Site Reliability Engineer",
        rating: 5,
        review: "Exceptional Performance Monitoring\n\nThe comprehensive monitoring capabilities are impressive. Being able to track multiple services and get instant notifications has been crucial for maintaining our service levels. The platform is reliable, fast, and worth every penny.",
        source: "Capterra.com",
        sourceUrl: "https://www.capterra.com"
    },
    {
        id: 4,
        name: "David Kumar",
        role: "Full Stack Developer",
        rating: 5,
        review: "Perfect for Managing Multiple Projects\n\nAs someone managing various client websites, Uptime Client has been invaluable. The dashboard is clean, alerts are timely, and I can easily monitor all my projects from one place. It's made my workflow so much more efficient.",
        source: "G2.com",
        sourceUrl: "https://www.g2.com"
    },
    {
        id: 5,
        name: "Lisa Thompson",
        role: "IT Manager",
        rating: 5,
        review: "Comprehensive and Reliable\n\nThe historical data and trend analysis have given us insights we never had before. It's not just about uptime monitoring—it's about understanding performance patterns and making proactive improvements. Excellent service with outstanding support.",
        source: "Trustpilot.com",
        sourceUrl: "https://www.trustpilot.com"
    },
    {
        id: 6,
        name: "James Wilson",
        role: "Technical Lead",
        rating: 5,
        review: "Simple Setup, Powerful Features\n\nGot everything set up in minutes, and the monitoring has been rock solid. The notification system is flexible, and the reporting features help us demonstrate reliability to our stakeholders. Great value and excellent performance.",
        source: "Capterra.com",
        sourceUrl: "https://www.capterra.com"
    }
];

const ReviewCard = ({ review }: { review: Review }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl max-w-3xl mx-auto"
    >
        {/* Rating Stars */}
        <div className="flex justify-center gap-1 mb-6">
            {[...Array(review.rating)].map((_, i) => (
                <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
            ))}
        </div>

        {/* Review Title and Text */}
        <div className="mb-8 text-center">
            <p className="text-gray-200 text-lg md:text-xl leading-relaxed whitespace-pre-line">
                {review.review}
            </p>
        </div>

        {/* Author Info */}
        <div className="text-center">
            <h4 className="text-white font-semibold text-xl mb-1">
                {review.name}
            </h4>
            {review.role && (
                <p className="text-gray-400 text-sm mb-4">
                    {review.role}
                </p>
            )}
            
            {/* Review Source Badge */}
            {/* <div className="inline-flex items-center justify-center mt-4">
                <a 
                    href={review.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                    Reviewed on {review.source}
                </a>
            </div> */}
        </div>
    </motion.div>
);

const ReviewSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % staticReviews.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex(prev => (prev - 1 + staticReviews.length) % staticReviews.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex, isAutoPlaying]);

    const currentReview = staticReviews[currentIndex];

    return (
        <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-gray-900 to-black">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
                            What Our Users Say
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust Uptime Client for their monitoring needs
                    </p>
                </motion.div>

                {/* Review Carousel - Single Card */}
                <div 
                    className="relative max-w-5xl mx-auto px-4 md:px-16"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="relative min-h-[400px] flex items-center justify-center">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                initial={{ 
                                    x: direction > 0 ? 500 : -500, 
                                    opacity: 0 
                                }}
                                animate={{ 
                                    x: 0, 
                                    opacity: 1 
                                }}
                                exit={{ 
                                    x: direction > 0 ? -500 : 500, 
                                    opacity: 0 
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 300, 
                                    damping: 30 
                                }}
                                className="w-full"
                            >
                                <ReviewCard review={currentReview} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    {staticReviews.length > 1 && (
                        <>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 z-10"
                                aria-label="Previous review"
                            >
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 z-10"
                                aria-label="Next review"
                            >
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            </motion.button>
                        </>
                    )}
                </div>

                {/* Pagination Dots */}
                {staticReviews.length > 1 && (
                    <div className="flex justify-center gap-2 mt-12">
                        {staticReviews.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`transition-all duration-300 rounded-full ${
                                    idx === currentIndex
                                        ? 'w-8 h-3 bg-gradient-to-r from-indigo-500 to-purple-600'
                                        : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                                }`}
                                aria-label={`Go to review ${idx + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReviewSection;
