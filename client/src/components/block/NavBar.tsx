import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';

const NavBar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md relative">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to={"/"}>
                            <h2 className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                UptimeClient
                            </h2>
                        </Link>
                    </div>
                    <div className="md:hidden">
                        <Button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            variant="ghost"
                            size="icon"
                            className="text-gray-700 hover:text-indigo-600"
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">About</Link>
                        <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</Link>
                        <Button onClick={()=>navigate("/dashboard")} className='bg-indigo-600 px-4 cursor-pointer'>Monitor</Button>
                    </div>
                </div>
                {/* Mobile menu */}
                <div className={`md:hidden absolute left-0 right-0 top-full bg-white shadow-lg transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                    <div className="flex flex-col space-y-4 px-6 py-4">
                        <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">About</Link>
                        <Link to="/pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</Link>
                        <Link to="/contact" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</Link>
                        <Button onClick={()=>navigate("/dashboard")} className='bg-indigo-600 w-full justify-center'>Monitor</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;