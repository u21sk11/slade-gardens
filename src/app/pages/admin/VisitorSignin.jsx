import React, { useState } from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { useNavigate } from "react-router-dom";
import { auditThirdPartySignin } from "../../../apis/audit";

function VisitorPage() {
  const [fullName, setFullName] = useState("");
  const [seeing, setSeeing] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isButtonDisabled = fullName === "" || seeing === "";
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const visitor = {
      fullName,
      seeing,
    };

    const audit = await auditThirdPartySignin(null, visitor);
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

  const ErrorMessage = ({ message }) => (
    <div className="text-red-500 text-center mb-4 font-bold">{message}</div>
  );

  return (
    <div
      className="min-h-[85vh] flex items-center justify-center py-5"
      style={{
        backgroundImage: "url(/user-login-bg.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative w-full max-w-4xl shadow-lg">
        <div className="absolute inset-0 bg-white opacity-85 rounded-lg shadow-md"></div>
        <div className="relative p-6">
          <h1
            className="text-3xl font-galindo font-bold text-sladeOrange text-center mb-10"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Visitor Check-in
          </h1>
          {error && <ErrorMessage message={error} />}
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
              id="seeing"
              label="Who are you here to see?"
              value={seeing}
              onChange={(e) => setSeeing(e.target.value)}
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
    </div>
  );
}

export default VisitorPage;
