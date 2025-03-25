import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/form/Button";
import {
  inPlayground,
  enterPlayground,
  exitPlayground,
} from "../../../apis/playground";

function YoungPersonConfirm() {
  const location = useLocation();
  const { childId, firstName, lastName } = location.state || {};
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const handleSuccess = async () => {
    const playgroundCheck = await inPlayground(childId);
    if (playgroundCheck) {
      // Log out if the child is in the playground
      await exitPlayground(childId);

      navigate("/admin/young-person/logout");
    } else {
      // If not, log in
      await enterPlayground(childId, firstName + " " + lastName);

      navigate("/admin/young-person/login");
    }
  };

  const handleTryAgain = () => {
    navigate("/admin/young-person");
  };

  return (
    <div className="min-h-[60vh] flex flex-col h-full flex-grow items-center justify-center p-2">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl text-sladeGreen font-galindo font-bold text-center">
          {alertMessage || `Are you ${firstName} ${lastName}?`}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-x-4 mt-2">
          <Button
            type="button"
            onClick={handleSuccess}
            buttonColor="bg-sladeGreen-dark"
            placeholderText="YES THAT'S ME!"
            className="hover:bg-sladeGreen-light w-full text-white text-xl mt-4 sm:mt-0"
          />
          <Button
            type="button"
            onClick={handleTryAgain}
            buttonColor="bg-sladeRed"
            placeholderText="NO, TRY AGAIN"
            className="hover:bg-sladeRed-dark hover:text-white w-full text-xl text-white border border-sladeRed-dark mt-4 sm:mt-0"
          />
        </div>
      </div>
    </div>
  );
}

export default YoungPersonConfirm;
