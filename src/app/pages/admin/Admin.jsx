import React from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage({ onLogout }) {
  const navigate = useNavigate();

  const handleAdminSignOut = () => {
    onLogout();
    navigate("/");
  };

  return (
    <>
      <div className="min-h-[60vh] flex items-center justify-center py-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
          <h2 className="text-3xl font-semibold font-galindo text-center text-sladeOrange mb-6">
            I am a...
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Carer / Parent */}
            <Link
              to="/admin/guardian"
              className="box bg-sladeYellow p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center font-semibold text-lg"
            >
              <div className="text-center text-gray-800">
                Stay and play parent / carer
              </div>
            </Link>

            {/* Young Person */}
            <Link
              to="/admin/young-person"
              className="box bg-sladeGreen p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-white font-semibold text-lg"
            >
              <div className="text-center">
                APG <br /> Young person
              </div>
            </Link>

            {/* Volunteer */}
            <Link
              to="/admin/volunteer"
              className="box bg-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-white font-semibold text-lg"
            >
              <div className="text-center">Volunteer</div>
            </Link>

            {/* Visitor */}
            <Link
              to="/admin/visitor"
              className="box bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center text-white font-semibold text-lg"
            >
              <div className="text-center">Visitor</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-3 space-x-4">
        <button
          onClick={handleAdminSignOut}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
        >
          Admin Sign Out
        </button>
        <button
          onClick={() => navigate("/admin/management")}
          className="bg-sladeOrange text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
        >
          Management
        </button>
      </div>
    </>
  );
}

export default HomePage;
