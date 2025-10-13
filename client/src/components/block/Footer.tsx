


import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-900 mt-auto">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h5 className="text-xl font-bold text-white mb-4">UptimeMonitor</h5>
                        <p className="text-gray-400">Keeping your websites running 24/7</p>
                    </div>
                    <div>
                        <h6 className="text-white font-semibold mb-4">Product</h6>
                        <ul className="space-y-2">
                        <li><Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors">About</Link></li>
                            <li><Link to="/pricing" className="text-gray-400 hover:text-indigo-400 transition-colors">Pricing</Link></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Documentation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-white font-semibold mb-4">Links</h6>
                        <ul className="space-y-2">
                            <li><Link to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors">Log In</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-white font-semibold mb-4">Legal</h6>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Privacy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Security</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 UptimeMonitor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}export default Footer;