import React, { useState } from "react";
import { inPlayground, enterPlayground, exitPlayground } from "../../../apis/playground";
import Button from "../../../components/form/Button";

function YoungPersonConfirm({ childId, firstName, lastName, onLogin, onLogout, onRetry }) {
  const [alertMessage] = useState("");

  const handleSuccess = async () => {
    const playgroundCheck = await inPlayground(childId);
    if (playgroundCheck) {
      // Log out if the child is in the playground
      await exitPlayground(childId);
      onLogout();
    } else {
      // If not, log in
      await enterPlayground(childId, firstName + " " + lastName);
      onLogin();
    }
  };

  const handleTryAgain = () => {
    onRetry();
  };

  return (
    <div className="w-full flex items-center justify-center">
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
