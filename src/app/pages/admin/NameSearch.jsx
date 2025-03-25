import React, { useState } from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { useNavigate } from "react-router-dom";
import { nameSearch } from "../../../apis/emojiStore";

function VisitorPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const isButtonDisabled = false;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSearchResults([]);

    if (firstName === "" && lastName === "") {
      setIsLoading(false);
      setError("Please enter either first or last name.");
      return;
    }

    try {
      const results = await nameSearch(firstName, lastName);
      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Failed to search. Please try again.");
    }
  };

  const handleSelect = (child) => {
    console.log(child);

    setSeeing(`${child.firstName} ${child.lastName}`);
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
            style={{ textShadow: "0.75px 0.75px 0.75px black" }}
          >
            Name Search
          </h1>
          {error && <ErrorMessage message={error} />}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
            autoComplete="off"
          >
            <Input
              id="FN"
              label="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-4 w-full"
            />
            <Input
              id="LN"
              label="Last Name"
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              className="mb-4 w-full"
            />
            <Button
              buttonColor="bg-sladeGreen"
              placeholderText={isLoading ? "Searching..." : "Search"}
              disabled={isButtonDisabled || isLoading}
              className={`w-full ${
                isButtonDisabled || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sladeGreen-dark"
              } text-white text-xl mt-6`}
            />
            <Button
              buttonColor="bg-sladeYellow"
              placeholderText={isLoading ? "Searching..." : "Clear"}
              disabled={isButtonDisabled || isLoading}
              className={`w-full ${
                isButtonDisabled || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sladeYellow-dark"
              } text-white text-xl mt-6`}
            />
          </form>
          {searchResults.length > 0 && (
            <table className="min-w-full mt-6">
              <tbody>
                {searchResults.map((child) => (
                  <tr key={child.childId}>
                    <td className="border px-4 py-2">{child.firstName}</td>
                    <td className="border px-4 py-2">{child.lastName}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleSelect(child)}
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                      >
                        In / Out
                      </button>
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => handleSelect(child)}
                        className="bg-sladeOrange text-white font-semibold py-2 px-4 rounded shadow hover:bg-sladeOrange-dark focus:outline-none focus:ring-2 focus:ring-sladeOrange-dark focus:ring-opacity-50 transition"
                      >
                        Emoji
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
