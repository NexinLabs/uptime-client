import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link to={"/"}>
                            <h2 className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 cursor-pointer">
                                UptimeMonitor
                            </h2>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
                        <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</a>
                        <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
                        <Button onClick={()=>navigate("/dashboard")} className='bg-indigo-600 px-4 cursor-pointer'>Monitor</Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;