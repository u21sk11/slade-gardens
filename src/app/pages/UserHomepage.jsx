import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserHomepage({ onLogout, userPool }) {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          Home Page
        </h2>
      </header>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Hello! Thanks for being a member of Slade Gardens!
        </h2>

        {!showChangePassword ? (
          <>
            <p className="text-gray-600 text-center mb-6">
              To amend your details, please contact:{" "}
              <a
                href="mailto:example@sladegarden.com"
                className="text-blue-500 underline"
              >
                example@sladegarden.com
              </a>
              .
            </p>
            <div className="flex flex-col gap-4 items-center">
              <button
                onClick={() => setShowChangePassword(true)}
                className="bg-sladeYellow text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-sladeYellow-dark transition-colors"
              >
                Change Password
              </button>
              <button
                onClick={handleUserLogout}
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
              >
                Log out
              </button>
            </div>
          </>
        ) : (
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
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-sladeYellow text-white px-4 py-2 rounded hover:bg-sladeYellow-dark disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserHomepage;
