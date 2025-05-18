import React, { useEffect, useState } from "react";
import { Authenticator, View, Image, Text, useTheme } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Admin from "./admin/Admin";
import Registration from "./Registration";

const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="Slade Gardens Logo"
                    src="https://sladeadventure.co.uk/wp-content/uploads/2019/07/slade-gardens-logo-no-bg.png"
                />
            </View>
        );
    }
}

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
        <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(/user-login-bg.webp)] bg-cover bg-center bg-blend-luminosity">
            <Authenticator components={components}>
                {({ signOut, user }) => {
                    if (group === "ADMINS") return <Admin />;

                    return <Registration />;
                }}
            </Authenticator>
        </div>
    );
};

export default Home;
