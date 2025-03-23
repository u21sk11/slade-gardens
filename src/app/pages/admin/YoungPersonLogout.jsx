import React from "react";
import Button from "../../../components/form/Button";
import { useNavigate } from "react-router-dom";

function YoungPersonLogout() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-5" >
      <div className="flex flex-col h-full bg-white flex-grow items-center justify-center gap-y-12 w-full max-w-4xl p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-galindo text-sladeOrange font-bold text-center">
          Wonderful, you're all logged out.
        </h1>
        <h3 className="font-monserrat text-2xl text-center">See you soon!</h3>
        <h3 className="text-5xl text-center">🚀</h3>
        <Button
          type="button"
          onClick={handleGoHome}
          buttonColor="bg-sladeYellow"
          placeholderText="HOME"
          className="hover:bg-sladeYellow-dark text-white text-xl mt-5 w-1/4"
        />
      </div>
    </div>
  );
}

export default YoungPersonLogout;
