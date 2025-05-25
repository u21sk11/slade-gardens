import React, { useState } from "react";
import GuardianSignin from "./GuardianSignin";
import YoungPerson from "./YoungPerson";
import YoungPersonConfirm from "./YoungPersonConfirm";
import YoungPersonLogin from "./YoungPersonLogin";
import YoungPersonLogout from "./YoungPersonLogout";
import VolunteerSignin from "./VolunteerSignin";
import VisitorSignin from "./VisitorSignin";
import ManagementPage from "./Management";
import RollCall from "./RollCall";

function Admin({ onLogout }) {
  const [view, setView] = useState("menu");
  const [youngPersonState, setYoungPersonState] = useState(null);

  const handleAdminSignOut = () => {
    onLogout();
  };

  const handleYoungPersonConfirm = (state) => {
    setYoungPersonState(state);
    setView("young-person-confirm");
  };

  const handleYoungPersonLoginLogout = (type) => {
    setView(type === "login" ? "young-person-login" : "young-person-logout");
  };

  const handleBackToMenu = () => {
    setView("menu");
    setYoungPersonState(null);
  };

  const handleRollCall = () => {
    setView("roll-call"); 
  };

  // Render logic
  let content;
  switch (view) {
    case "guardian":
      content = (
        <>
          <GuardianSignin />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "young-person":
      content = (
        <>
          <YoungPerson
            onConfirm={(state) => handleYoungPersonConfirm(state)}
          />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "young-person-confirm":
      content = (
        <>
          <YoungPersonConfirm
            {...(youngPersonState || {})}
            onLogin={() => handleYoungPersonLoginLogout("login")}
            onLogout={() => handleYoungPersonLoginLogout("logout")}
            onRetry={() => setView("young-person")}
          />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "young-person-login":
      content = (
        <>
          <YoungPersonLogin />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "young-person-logout":
      content = (
        <>
          <YoungPersonLogout />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "volunteer":
      content = (
        <>
          <VolunteerSignin returnToMenu={handleBackToMenu} />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "visitor":
      content = (
        <>
          <VisitorSignin returnToMenu={handleBackToMenu} />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "management":
      content = (
        <>
          <ManagementPage rollCall={handleRollCall}/>
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    case "roll-call":
      content = (
        <>
          <RollCall />
          <BackButton onClick={handleBackToMenu} />
        </>
      );
      break;
    default:
      content = (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mb-6">
          <h2 className="text-3xl font-semibold font-galindo text-center text-sladeOrange mb-6">
            I am a...
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
              className="box bg-sladeYellow p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-center font-semibold text-lg"
              onClick={() => setView("guardian")}
            >
              <div className="text-center text-gray-800">
                Stay and play parent / carer
              </div>
            </button>
            <button
              className="box bg-sladeGreen p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-center text-white font-semibold text-lg"
              onClick={() => setView("young-person")}
            >
              <div className="text-center">
                APG <br /> Young person
              </div>
            </button>
            <button
              className="box bg-blue-500 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-center text-white font-semibold text-lg"
              onClick={() => setView("volunteer")}
            >
              <div className="text-center">Volunteer</div>
            </button>
            <button
              className="box bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow flex items-center justify-center text-white font-semibold text-lg"
              onClick={() => setView("visitor")}
            >
              <div className="text-center">Visitor</div>
            </button>
          </div>
          <div className="flex justify-center items-center p-3 space-x-4 mt-6">
            <button
              onClick={() => setView("management")}
              className="bg-sladeOrange text-white font-semibold py-2 px-4 rounded shadow hover:shadow-xl transition"
            >
              Management
            </button>
            <button
              onClick={() => setView("roll-call")}
              className="bg-sladeGreen text-white font-semibold py-2 px-4 rounded shadow hover:shadow-xl transition"
            >
              Roll Call
            </button>
            <button
              onClick={handleAdminSignOut}
              className="bg-sladeRed text-white font-semibold py-2 px-4 rounded shadow hover:shadow-xl transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      );
  }

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center py-5">
      {content}
    </div>
  );
}

function BackButton({ onClick }) {
  return (
    <div className="flex justify-center items-center p-3">
      <button
        onClick={onClick}
        className="bg-sladeYellow hover:bg-sladeYellow-dark text-white font-semibold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
      >
        Back
      </button>
    </div>
  );
}

export default Admin;
