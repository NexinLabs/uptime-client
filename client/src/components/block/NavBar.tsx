// import React from "react";
import { motion } from 'framer-motion';


const NavBar = () =>{
    return (
        <nav className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl font-bold text-indigo-600"
                            >
                                UptimeMonitor
                            </motion.div>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">Features</a>
                            <a href="#pricing" className="text-gray-700 hover:text-indigo-600 transition-colors">Pricing</a>
                            <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
                            <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default NavBar;