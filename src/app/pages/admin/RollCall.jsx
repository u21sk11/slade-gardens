import React, { useState, useEffect } from "react";
import { exitPlayground, rollCall } from "../../../apis/playground";

function VolunteerSignin() {
  useEffect(() => {
    const fetchRollCall = async () => {
      const childrenNames = await rollCall();
      setChildrenNames(childrenNames);
    };

    fetchRollCall();
  }, []);

  const [childrenNames, setChildrenNames] = useState([]);

  const handleLogout = (childId) => {
    exitPlayground(childId);
    setChildrenNames((prevChildrenNames) =>
      prevChildrenNames.filter((child) => child.childId !== childId)
    );
    console.log(`${childId} logged out`);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl shadow-lg">
        <div className="absolute inset-0 bg-white opacity-85 rounded-lg shadow-md"></div>
        <div className="relative p-6">
          <h1
            className="text-3xl font-galindo font-bold text-sladeOrange text-center mb-10"
            style={{ textShadow: "0.75px 0.75px 0.75px black" }}
          >
            Roll Call
          </h1>
          <table className="min-w-full bg-white">
            <tbody>
              {childrenNames.map((child, index) => (
                <tr key={index + child.childId}>
                  <td className="py-2 px-4 border-b text-center">
                    {child.fullName}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleLogout(child.childId)}
                      className="bg-sladeYellow-light text-white font-semibold py-1 px-3 rounded shadow hover:bg-sladeYellow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                    >
                      Logout
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignin;
