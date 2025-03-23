import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle mobile menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md p-2 sticky top-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-gray-800 text-2xl font-semibold">
                    <img
                        src="/src/assets/slade-social-media.webp"
                        alt="Logo"
                        className="h-16 md:h-24"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="text-[#222831] font-bold uppercase hover:bg-green-400 px-4 py-2 rounded-md transition">
                        Home
                    </Link>
                    <Link to="/register" className="text-[#222831] font-bold uppercase hover:bg-orange-400 px-4 py-2 rounded-md transition">
                        Register
                    </Link>
                    <Link to="/about" className="text-[#222831] font-bold uppercase hover:bg-green-400 px-4 py-2 rounded-md transition">
                        About
                    </Link>
                    <Link to="/contact" className="text-[#222831] font-bold uppercase hover:bg-green-400 px-4 py-2 rounded-md transition">
                        Contact
                    </Link>
                </div>

                {/* Hamburger Menu for Mobile */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-800 focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden flex flex-col space-y-4 mt-2 bg-gray-200 p-2">
                    <Link to="/" className="text-[#222831] font-bold uppercase hover:bg-green-400 px-4 py-2 rounded-md transition" onClick={toggleMenu}>
                        Home
                    </Link>
                    <Link to="/register" className="text-[#222831] font-bold uppercase hover:bg-orange-400 px-4 py-2 rounded-md transition" onClick={toggleMenu}>
                        Register
                    </Link>
                    <Link to="/about" className="text-[#222831] font-bold uppercase hover:bg-green-400 px-4 py-2 rounded-md transition" onClick={toggleMenu}>
                        About
                    </Link>
                    <Link to="/contact" className="text-[#222831] font-bold uppercase hover:bg-green-400 px-4 py-2 rounded-md transition" onClick={toggleMenu}>
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;


