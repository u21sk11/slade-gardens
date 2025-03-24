import React, { useState, useEffect } from "react";
import Button from "../../../components/form/Button";
import Input from "../../../components/form/Input";
import { useNavigate } from "react-router-dom";
import { rollCall } from "../../../apis/playground";

function VolunteerSignin() {
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRollCall = async () => {
      const childrenNames = await rollCall();
      setChildrenNames(childrenNames);
    };

    fetchRollCall();
  }, []);

  const [childrenNames, setChildrenNames] = useState([]);

  const handleLogout = (name) => {
    // Implement logout functionality here
    console.log(`${name} logged out`);
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
            Roll Call
          </h1>
          {error && <ErrorMessage message={error} />}
          <table className="min-w-full bg-white">
            <tbody>
              {childrenNames.map((name, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{name}</td>
                  <td className="py-2 px-4 border-b text-right">
                    <button
                      onClick={() => handleLogout(name)}
                      className="bg-sladeYellow-light text-white font-semibold py-1 px-3 rounded shadow hover:bg-sladeYellow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                    >
                      Logout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default VolunteerSignin;
