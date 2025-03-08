


function Footer() {
    return (
        <footer className="bg-gray-900 mt-24">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h5 className="text-xl font-bold text-gray-900 mb-4">UptimeMonitor</h5>
                        <p className="text-gray-200">Keeping your websites running 24/7</p>
                    </div>
                    <div>
                        <h6 className="text-gray-100 font-semibold mb-4">Product</h6>
                        <ul className="space-y-2 text-gray-600 *:text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">Features</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Pricing</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Documentation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-gray-100 font-semibold mb-4">Company</h6>
                        <ul className="space-y-2 text-gray-600 *:text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">About</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="text-gray-100 font-semibold mb-4">Legal</h6>
                        <ul className="space-y-2 text-gray-600 *:text-gray-500">
                            <li><a href="#" className="hover:text-indigo-600">Privacy</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Terms</a></li>
                            <li><a href="#" className="hover:text-indigo-600">Security</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-400">
                    <p>© 2025 UptimeMonitor. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;