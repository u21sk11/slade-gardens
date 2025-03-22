import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage({ onLogout }) {
    const navigate = useNavigate();

    const handleAdminSignOut = () => {
        onLogout();
        navigate('/');

    }


    return (
        <>
            <div className="min-h-[60vh] flex items-center justify-center py-8">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <h2 className="text-3xl font-semibold font-galindo text-center text-sladeOrange mb-6">
                        I am a...
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Carer / Parent */}
                        <div className="box bg-sladeYellow p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
                            <Link to="/admin/guardian-signin" className="block text-center text-gray-800 font-semibold text-lg">
                                Stay and play parent / carer
                            </Link>
                        </div>

                        {/* Young Person */}
                        <div className="box bg-sladeGreen p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
                            <Link to="/admin/young-person" className="block text-center text-white font-semibold text-lg">
                                APG <br /> Young person
                            </Link>
                        </div>

                        {/* Volunteer */}
                        <div className="box bg-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
                            <Link to="/admin/volunteer" className="block text-center text-white font-semibold text-lg">
                                Volunteer
                            </Link>
                        </div>

                        {/* Visitor */}
                        <div className="box bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center">
                            <Link to="/admin/visitor" className="block text-center text-white font-semibold text-lg">
                                Visitor
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center items-center ">
                <button onClick={handleAdminSignOut}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
                >
                    Admin Sign Out
                </button>
            </div>
        </>
    );
}

export default HomePage;


