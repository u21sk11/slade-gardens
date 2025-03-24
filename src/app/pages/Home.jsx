import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import Registration from "./Registration";
import Admin from "./admin/Admin";

const getUserGroup = async () => {
  const session = await fetchAuthSession();
  const cognitoGroups = session.tokens.accessToken.payload["cognito:groups"];

  if (!cognitoGroups) {
    return null;
  }

  return session.tokens.accessToken.payload["cognito:groups"][0];
};

function Home() {
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    const fetchUserGroup = async () => {
      const group = await getUserGroup();
      setUserGroup(group);
    };
    fetchUserGroup();
  }, []);

  return (
    <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(./src/assets/user-login-bg.webp)] bg-cover bg-center">
      <Authenticator>
        {({ signOut, user }) => {
          const fetchUserGroup = async () => {
            const group = await getUserGroup();
            setUserGroup(group);
          };

          fetchUserGroup();

          if (userGroup === "admin") {
            return (
              <div className="min-h-screen flex flex-col">
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mt-8 mx-auto"
                  onClick={signOut}
                >
                  Sign Out
                </button>
                <Admin />
              </div>
            );
          }

          if (userGroup === "registered") {
            return (
              <div className="min-h-screen flex flex-col">
                <h1 className="text-3xl font-semibold text-center mt-12">
                  registered
                </h1>
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mt-8 mx-auto"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            );
          }

          if (userGroup === null) {
            return (
              <div className="min-h-screen flex flex-col">
                <h1 className="text-3xl font-semibold text-center mt-12">
                  <Registration />
                </h1>
                <button
                  className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mt-8 mx-auto"
                  onClick={signOut}
                >
                  Sign Out
                </button>
              </div>
            );
          }

          return (
            <div className="min-h-screen flex flex-col">
              <h1 className="text-3xl font-semibold text-center mt-12"></h1>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mt-8 mx-auto"
                onClick={signOut}
              >
                Sign Out
              </button>
            </div>
          );
        }}
      </Authenticator>
    </div>
  );
}

export default Home;
