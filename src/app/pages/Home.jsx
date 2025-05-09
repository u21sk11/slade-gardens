import React, { useEffect, useState } from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Admin from "./admin/Admin";
import Registration from "./Registration";

const Home = () => {
    const [group, setGroup] = useState("");
    const [loadingGroups, isLoadingGroups] = useState(true);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", async (data) => {
            if (data.payload.event === "signedIn") {
                printUserGroups().then((result) => {
                    console.log(result);
                    setGroup(result);
                });
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const printUserGroups = async () => {
        const session = await fetchAuthSession();
        const groups = session.tokens.accessToken.payload["cognito:groups"];

        if (groups) return groups[0];

        return "";
    };

    return (
        <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(./src/assets/user-login-bg.webp)] bg-cover bg-center">
            <Authenticator>
                {({ signOut, user }) => {
                    if (group === "ADMINS") {
                        return <Admin />;
                    }

                    return <Registration />;
                }}
            </Authenticator>
        </div>
    );
};

export default Home;
