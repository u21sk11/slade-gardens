import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GuardianSignin() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();  // Hook to navigate to other routes

    // Handle email input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Optionally, store the email in localStorage, state, or pass it to the next page
            localStorage.setItem('carerEmail', email); // Store email in localStorage for future use

            // Navigate to the next page
            setSubmitted(true);
            navigate('/admin/who-are-you-with'); // Navigate to the next page (e.g., Who Are You With?)
        }
    };

    return (
        <div className="min-h-[85vh] bg-gray-50 flex items-center justify-center py-4"
             style={{
                 backgroundImage: 'url(/user-login-bg.webp)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
             }}
        >
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <header className="text-center mb-4">
                    <h2 className="text-2xl font-semibold font-galindo text-gray-800">Enter your Email</h2>
                </header>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-lg font-medium text-gray-700">Email Address:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                required
                                placeholder="Enter your email"
                                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-sladeYellow text-white font-semibold rounded-lg hover:bg-sladeYellow-dark focus:outline-none"
                        >
                            Next
                        </button>
                    </form>
                ) : (
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800">Thank you for submitting your email!</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default GuardianSignin;
