import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gray-900 shadow-lg relative z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to={"/"}>
                            <h2 className="text-2xl font-bold text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors duration-300">
                                UptimeClient
                            </h2>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <Button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-800 transition-all duration-300"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/about" className="text-gray-300 hover:text-indigo-400 transition-all duration-300 hover:scale-105">About</Link>
                        <Link to="/pricing" className="text-gray-300 hover:text-indigo-400 transition-all duration-300 hover:scale-105">Pricing</Link>
                        <Link to="/contact" className="text-gray-300 hover:text-indigo-400 transition-all duration-300 hover:scale-105">Contact</Link>
                        <Button onClick={()=>navigate("/dashboard")} className='bg-indigo-600 hover:bg-indigo-700 px-4 cursor-pointer transition-all duration-300 hover:scale-105'>Monitor</Button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Sidebar - Slides from left */}
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 md:hidden transition-opacity duration-300 ${
                    isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onClick={() => setIsMenuOpen(false)}
            />
            <div 
                className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-2xl md:hidden transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <h2 className="text-xl font-bold text-indigo-400">UptimeClient</h2>
                        <Button
                            onClick={() => setIsMenuOpen(false)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-700 transition-all duration-300"
                        >
                            <X className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="flex flex-col space-y-1 p-4 flex-grow">
                        <Link 
                            to="/about" 
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-700 transition-all duration-300 px-4 py-3 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link 
                            to="/pricing" 
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-700 transition-all duration-300 px-4 py-3 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Pricing
                        </Link>
                        <Link 
                            to="/contact" 
                            className="text-gray-300 hover:text-indigo-400 hover:bg-gray-700 transition-all duration-300 px-4 py-3 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contact
                        </Link>
                        <div className="pt-4">
                            <Button 
                                onClick={() => {
                                    navigate("/dashboard");
                                    setIsMenuOpen(false);
                                }} 
                                className='bg-indigo-600 hover:bg-indigo-700 w-full justify-center transition-all duration-300'
                            >
                                Monitor
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;