import React, { useState } from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { useNavigate } from "react-router-dom";
import { auditThirdPartySignin } from "../../../apis/audit";

function VolunteerSignin() {
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isButtonDisabled = fullName === "" || organization === "";
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const volunteer = {
      fullName,
      organization,
    };

   const audit = await auditThirdPartySignin(volunteer);
    if (audit) {
      navigate("/admin");
    } else {
      setIsLoading(false);
      setError("Failed to check-in. Please try again.");
    }
  };

  const handleGoBack = () => {
    navigate("/admin");
  };

  return (
      <div className="min-h-[100vh] flex items-center justify-center py-5"
      style={{
        backgroundImage: 'url(/user-login-bg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}>
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl opacity-95">
          <h1 className="text-3xl font-galindo font-bold text-sladeOrange text-center mb-10">
            Volunteer Check-in
          </h1>
          {error && (
            <div className="text-red-500 text-center mb-4">
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
          >
            <Input
              id="fullName"
              label="Full Name*"
              type="fullName"
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mb-4 w-full"
            />
            <Input
              id="organization"
              label="Organisation*"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              required
              className="mb-4 w-full"
            />
            <Button
              type="submit"
              buttonColor="bg-sladeGreen"
              onClick={handleSubmit}
              placeholderText={isLoading ? "Submitting..." : "Submit"}
              disabled={isButtonDisabled || isLoading}
              className={`w-full ${
                isButtonDisabled || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sladeGreen-dark"
              } text-white text-xl mt-6`}
            />
          </form>
      <div className="flex justify-center items-center p-3">
        <button
          onClick={handleGoBack}
          className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
        >
          Go Back
        </button>
      </div>
        </div>
      </div>
  );
}

export default VolunteerSignin;
