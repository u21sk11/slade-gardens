import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGuardian } from "../../../apis/guardian";

function GuardianSignin({ onConfirm }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook to navigate to other routes

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    const results = await getGuardian(email);

    if (!results || results.data.length === 0) {
      setError("No guardian found with this email.");
      return;
    }

    onConfirm(email);
  };

  const ErrorMessage = ({ message }) => (
    <div className="text-red-500 text-center mb-4 font-bold">{message}</div>
  );

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <header className="text-center mb-4">
          <h2 className="text-2xl font-semibold font-galindo text-gray-800">
            Enter your Email
          </h2>
        </header>
        {error && <ErrorMessage message={error} />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-700"
            >
              Email Address:
            </label>
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
            disabled={!email}
            className={
              "w-full py-3 bg-sladeYellow text-gray-800 font-semibold rounded-lg focus:outline-none " +
              (!email
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sladeYellow-dark")
            }
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default GuardianSignin;
