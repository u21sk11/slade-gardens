import React, { useState } from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { nameSearch } from "../../../apis/emojiStore";

function NameSearch() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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

    const results = await nameSearch(firstName, lastName);
    
    if (results){
      if (results.length === 0) {
        setIsLoading(false);
        setError("No results found. Please try again.");
        return;
      }
      setSearchResults(results);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError("Failed to search. Please try again.");
    }
  };

  const handleSelect = (child) => {
    console.log(child);
    alert(child.emoji);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFirstName("");
    setLastName("");
    setSearchResults([]);
    setError("");
    document.getElementById("FN").value = "";
    document.getElementById("LN").value = "";
    document.getElementById("FN").focus();
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
            Name Search
          </h1>
          {error && <ErrorMessage message={error} />}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center"
            autoComplete="off"
          >
            <Input
              id="fullName"
              label="First Name"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-4 w-full"
            />
            <Input
              id="lastName"
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
              onClick={handleClear}
              placeholderText={isLoading ? "Searching..." : "Clear"}
              disabled={isButtonDisabled || isLoading}
              className={`w-full ${
                isButtonDisabled || isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-sladeYellow-dark"
              } text-gray-800 text-xl mt-6`}
            />
          </form>
          {searchResults.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full">
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
                          APG
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NameSearch;
