import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 w-full mt-auto">
            <p className="text-center text-sm">
                We respect your privacy. Learn how we handle your data in our{' '}
                <Link to="/privacy-policy" className="text-blue-400 hover:text-blue-600">
                    Privacy Policy
                </Link>.
            </p>
        </footer>
    );
}

export default Footer;


