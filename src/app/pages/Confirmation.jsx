import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const { firstNames, emojis } = location.state || {
    firstNames: [],
    emojis: [],
  };

return (
    <div className="min-h-[60vh] flex items-center justify-center py-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl text-center">
            <h1 className="text-5xl font-galindo font-bold text-sladeOrange mb-1">
                Registration Successful!
            </h1>
            <br />
            <p className="font-galindo text-2xl">
                Thank you for registering. Here are the login details for your
                children:
            </p>
            <ul className="list-none">
                {firstNames.map((name, index) => (
                    <li key={`${name}-${index}`} className="my-4 text-xl">
                        <span className="font-bold">{name}</span>
                        {emojis[index] && <div className="text-3xl">{emojis[index]}</div>}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
};

export default Confirmation;
