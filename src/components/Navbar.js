import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle mobile menu visibility
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 w-full z-10"> {/* Lighter navbar color and sticky */}
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-gray-800 text-2xl font-semibold">
                    {/* Larger logo size */}
                    <img
                        src="/slade-social-media.png"
                        alt="Logo"
                        className="h-32" // Adjust size to be larger
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6"> {/* More spacing between links */}
                    <Link to="/" className="text-[#222831] font-bold uppercase hover:bg-gray-400 px-4 py-2 rounded-md transition">
                        Home
                    </Link>
                    <Link to="/about" className="text-[#222831] font-bold uppercase hover:bg-gray-400 px-4 py-2 rounded-md transition">
                        About
                    </Link>
                    <Link to="/contact" className="text-[#222831] font-bold uppercase hover:bg-gray-400 px-4 py-2 rounded-md transition">
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
                <div className="md:hidden flex flex-col space-y-4 mt-4 bg-gray-200 p-4"> {/* Same lighter background for mobile */}
                    <Link to="/" className="text-[#222831] font-bold uppercase hover:bg-gray-400 px-4 py-2 rounded-md transition">
                        Home
                    </Link>
                    <Link to="/about" className="text-[#222831] font-bold uppercase hover:bg-gray-400 px-4 py-2 rounded-md transition">
                        About
                    </Link>
                    <Link to="/contact" className="text-[#222831] font-bold uppercase hover:bg-gray-400 px-4 py-2 rounded-md transition">
                        Contact
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;


