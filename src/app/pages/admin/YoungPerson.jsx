import React, { useState } from "react";
import EmojiButtonGrid from "../../../components/ui/EmojiButtonGrid";
import Button from "../../../components/form/Button";
import BackButton from "../../../components/form/BackButton";
import { Link } from "react-router-dom";
import { getChildFromEmoji } from "../../../apis/emojiStore";

function YoungPerson({ onConfirm , onNameSearch }) {
  const [inputs, setInputs] = useState(["", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");

  const handleEmojiClick = (emoji) => {
    if (currentIndex < 3) {
      const newInputs = [...inputs];
      newInputs[currentIndex] = emoji;
      setInputs(newInputs);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackOnClick = () => {
    if (currentIndex > 0) {
      const newInputs = [...inputs];
      newInputs[currentIndex - 1] = "";
      setInputs(newInputs);
      setCurrentIndex(currentIndex - 1);
    }

    if (error) {
      setError("");
    }
  };

  const isButtonDisabled = inputs.some((input) => input === "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const password = inputs.join("");

    const child = await getChildFromEmoji(password);

    if (child === "notAssigned") {
      window.scrollTo(0, 0);
      setError("Oh no! We cannot find you!");
      return;
    }

    onConfirm({
      childId: child.childId,
      firstName: child.firstName,
      lastName: child.lastName,
    });
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-4xl shadow-md">
        <div className="absolute inset-0 bg-white opacity-85 rounded-lg shadow-md"></div>
        <div className="relative p-6">
          <div>
            <h1
              className="text-3xl font-galindo font-bold text-sladeOrange text-center mb-1"
              style={{ textShadow: "0.75px 0.75px 0.75px black" }}
            >
              Adventure Playground
            </h1>
            <h1
              className="text-3xl font-galindo font-bold text-sladeOrange-light text-center"
              style={{ textShadow: "0.75px 0.75px 0.75px black" }}
            >
              Login / Logout
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-6">
              <div className="flex space-x-4 justify-center items-center">
                {inputs.map((input, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 border border-gray-400 flex items-center justify-center bg-white text-2xl rounded-xl"
                  >
                    {input}
                  </div>
                ))}
                <BackButton
                  buttonColor="bg-sladeRed"
                  onClick={handleBackOnClick}
                />
              </div>
              {error && (
                <p className="text-red-500 text-center font-semibold font-monserrat mt-4">
                  {error}
                </p>
              )}
            </div>
            <div className="mt-4">
              <EmojiButtonGrid onEmojiClick={handleEmojiClick} />
            </div>
            <Button
              type="submit"
              buttonColor="bg-sladeGreen"
              placeholderText="OK"
              disabled={isButtonDisabled}
              className={`${
                isButtonDisabled ? "" : "hover:bg-sladeGreen-dark"
              } w-full text-white text-xl mt-8`}
            />
          </form>
          <div className="flex justify-center mt-3">
            <button
              onClick={onNameSearch}
              to="/privacy-policy"
              className="text-gray-700 font-monserrat underline underline-offset-1 hover:text-gray-900"
            >
              Log in with your name instead
            </button>
          </div>
          <div className="flex justify-center items-center p-3"></div>
        </div>
      </div>
    </div>
  );
}

export default YoungPerson;
