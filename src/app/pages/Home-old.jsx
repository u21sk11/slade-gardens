import React from "react";
import { Link } from "react-router-dom";
import { Authenticator } from "@aws-amplify/ui-react";
// import Footer from "../components/Footer";

function Home() {
  return (
    <div>
      <header className="flex justify-center mt-12">
        <img
          className="w-64 h-auto"
          src="./src/assets/slade-social-media.webp"
          alt="Slade Gardens Adventure Playground"
        />
      </header>

      <Authenticator>
        {({ signOut, user }) => (
          <div className="min-h-screen flex flex-col">
            <h1 className="text-3xl font-semibold text-center mt-12">
              Thank you for visiting us today
            </h1>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mt-8 mx-auto"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </Authenticator>
    </div>
  );
}

export default Home;
