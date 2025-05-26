import { useState } from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { auditThirdPartySignin } from "../../../apis/audit";

function VisitorSignin({ returnToMenu }) {
  const [fullName, setFullName] = useState("");
  const [seeing, setSeeing] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = fullName === "" || seeing === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const visitor = {
      fullName,
      seeing,
    };

    const audit = await auditThirdPartySignin(null, visitor);
    if (audit) {
      returnToMenu();
    } else {
      setIsLoading(false);
      setError("Failed to check-in. Please try again.");
    }
  };

  const ErrorMessage = ({ message }) => (
    <div className="text-red-500 text-center mb-4 font-bold">{message}</div>
  );

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl shadow-md">
        <div className="absolute inset-0 bg-white opacity-85 rounded-lg shadow-md"></div>
        <div className="relative p-6">
          <h1
            className="text-3xl font-galindo font-bold text-sladeOrange text-center mb-10"
            style={{ textShadow: "0.75px 0.75px 0.75px black" }}
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
        </div>
      </div>
    </div>
  );
}

export default VisitorSignin;
