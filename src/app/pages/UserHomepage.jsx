import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserHomepage({ onLogout }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    // In here, we originally had the logic to check that if this URL was accessed by someone without
    // correct role, they would be redirected to the homepage. Not sure if we need this with the new setup.
  }, []);

  const validatePassword = (value) => {
    const newMessages = [];
    if (value.length < 8) {
      newMessages.push("Password must be at least 8 characters long.");
    }
    if (!/(?=.*\d)/.test(value)) {
      newMessages.push("Password must contain at least one number.");
    }
    if (!/(?=.*[!@#$%^&*(),.?":{}_|<>])/.test(value)) {
      newMessages.push("Password must contain at least one special character.");
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      newMessages.push("Password must contain at least one uppercase letter.");
    }
    if (!/(?=.*[a-z])/.test(value)) {
      newMessages.push("Password must contain at least one lowercase letter.");
    }
    return newMessages;
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errors = validatePassword(newPassword);

    if (newPassword !== confirmPassword) {
      errors.push("New password and confirmation do not match.");
    }

    if (errors.length > 0) {
      setPasswordErrors(errors);
      setSubmissionStatus("error");
      setIsLoading(false);
      return;
    }

    // This is where the API call for changing password would go.
  };

  const handleUserLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-14">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-green-600 mb-4">
          Welcome!
        </h2>
      </header>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Hello! Please select an option below.
      </h2>

      {/*Default Section, when no other option is selected*/}
      <>
        <div className="flex gap-4 justify-center mb-6">
          <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex-1 text-center">
            View Child Emojis
          </button>
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex-1 text-center"
          >
            Change Password
          </button>
          <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex-1 text-center">
            Update Information
          </button>
          <button className="bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition-colors flex-1 text-center">
            View Details
          </button>
        </div>
      </>

      {/* This shows up when the change password option is selected (haven't added logic for one menu being open at a time yet) */}
      {showChangePassword && (
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Old Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          {passwordErrors.length > 0 && (
            <div className="text-red-600 text-sm space-y-1">
              {passwordErrors.map((error, index) => (
                <p key={index}>• {error}</p>
              ))}
            </div>
          )}

          {submissionStatus === "success" && (
            <div className="text-green-600 text-sm">
              Password changed successfully!
            </div>
          )}

          <div className="flex gap-4 justify-end">
            <button
              type="button"
              onClick={() => {
                setShowChangePassword(false);
                setSubmissionStatus(null);
                setPasswordErrors([]);
              }}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      )}
      
      {/*Default Section, when no other option is selected*/}
      {!showChangePassword && (
        <>
          <div className="flex flex-col gap-4 place-items-start mt-10">
            <button
              onClick={handleUserLogout}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default UserHomepage;
