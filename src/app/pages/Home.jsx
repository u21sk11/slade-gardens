import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

Hub.listen("auth", async (data) => {
  console.log(data);
  console.log(await printUserGroups());
});

const printUserGroups = async () => {
  const session = await fetchAuthSession();
  const groups = session.tokens.accessToken.payload["cognito:groups"];

  if (groups) return groups[0];

  return [];
};

function Home() {
  return (
    <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(/user-login-bg.webp)] bg-cover bg-center">
      <Authenticator>
        {({ signOut, user }) => {
          const isAdmin = true;

          if (isAdmin) {
            return (
              <div className="min-h-screen flex flex-col">
                <h1 className="text-3xl font-semibold text-center mt-12">
                  admin
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
              <h1 className="text-3xl font-semibold text-center mt-12">
                Not an admin
              </h1>
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
