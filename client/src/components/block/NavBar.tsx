import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, Activity, TrendingUp, Mail, Info, DollarSign } from 'lucide-react';

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    const navLinks = [
        { path: '/about', label: 'About', icon: Info },
        { path: '/pricing', label: 'Pricing', icon: DollarSign },
        { path: '/contact', label: 'Contact', icon: Mail },
    ];

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-gray-900 md:bg-gray-900/95 md:backdrop-blur-lg shadow-xl border-b border-indigo-500/20' 
                : 'bg-gray-900 shadow-lg'
        }`}>
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo Section with Animation */}
                    <div className="flex items-center space-x-3 group">
                        <Link to={"/"} className="flex items-center space-x-3">
                            <div className="relative">
                                <Activity className="h-8 w-8 text-indigo-400 group-hover:text-indigo-300 transition-all duration-300 group-hover:rotate-12" />
                                <div className="absolute inset-0 bg-indigo-400/20 blur-xl group-hover:bg-indigo-300/30 transition-all duration-300 rounded-full"></div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent group-hover:from-indigo-300 group-hover:to-purple-300 transition-all duration-300">
                                    UptimeClient
                                </h2>
                                <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    Monitor & Protect
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-800 transition-all duration-300 relative group"
                        >
                            <div className="absolute inset-0 bg-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {isMenuOpen ? <X className="h-6 w-6 relative z-10" /> : <Menu className="h-6 w-6 relative z-10" />}
                        </Button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map(({ path, label, icon: Icon }) => (
                            <Link 
                                key={path}
                                to={path} 
                                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                                    isActive(path)
                                        ? 'text-indigo-300'
                                        : 'text-gray-300 hover:text-indigo-400'
                                }`}
                            >
                                <div className="flex items-center space-x-2">
                                    <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                    <span>{label}</span>
                                </div>
                                {isActive(path) && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                                )}
                                <div className="absolute inset-0 bg-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                            </Link>
                        ))}
                        <Button 
                            onClick={()=>navigate("/dashboard")} 
                            className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50 ml-4 group relative overflow-hidden'
                        >
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <Activity className="h-4 w-4 mr-2 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="relative z-10">Monitor</span>
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Sidebar - Enhanced */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsMenuOpen(false)}
            />
            <div 
                className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl md:hidden transform transition-all duration-300 ease-out ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-800/50">
                        <div className="flex items-center space-x-3">
                            <Activity className="h-6 w-6 text-indigo-400" />
                            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                UptimeClient
                            </h2>
                        </div>
                        <Button
                            onClick={() => setIsMenuOpen(false)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-700 transition-all duration-300"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-2 p-4 flex-grow">
                        {navLinks.map(({ path, label, icon: Icon }, index) => (
                            <Link 
                                key={path}
                                to={path} 
                                className={`text-gray-300 hover:text-indigo-400 hover:bg-gray-700/50 transition-all duration-300 px-4 py-3 rounded-lg flex items-center space-x-3 group ${
                                    isActive(path) ? 'bg-indigo-500/10 text-indigo-300 border-l-2 border-indigo-400' : ''
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                                style={{ 
                                    transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms',
                                    opacity: isMenuOpen ? 1 : 0,
                                    transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                                }}
                            >
                                <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                <span className="font-medium">{label}</span>
                            </Link>
                        ))}
                        
                        {/* Mobile CTA */}
                        <div className="pt-4" style={{ 
                            transitionDelay: isMenuOpen ? '150ms' : '0ms',
                            opacity: isMenuOpen ? 1 : 0,
                            transform: isMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                        }}>
                            <Button 
                                onClick={() => {
                                    navigate("/dashboard");
                                    setIsMenuOpen(false);
                                }} 
                                className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 w-full justify-center transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/50 group'
                            >
                                <Activity className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                Go to Dashboard
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Footer */}
                    <div className="p-4 border-t border-gray-700/50 bg-gray-800/30">
                        <p className="text-xs text-gray-400 text-center">
                            © 2024 UptimeClient
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;