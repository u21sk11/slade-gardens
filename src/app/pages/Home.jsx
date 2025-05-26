import React, { useEffect, useState } from "react";
import { Authenticator, View, Image, Text, useTheme } from "@aws-amplify/ui-react";
import { fetchAuthSession } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import Admin from "./admin/Admin";
import Registration from "./Registration";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const components = {
    Header() {
        const { tokens } = useTheme();

        return (
            <View textAlign="center" padding={tokens.space.large}>
                <Image
                    alt="Slade Gardens Logo"
                    src="./slade-social-media.webp"
                />
            </View>
        );
    }
}

const Home = () => {
    const [group, setGroup] = useState("");
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        getUserGroups().then((result) => {
            isLoading(false);
            setGroup(result);
        });

        const unsubscribe = Hub.listen("auth", async (data) => {
            if (data.payload.event === "signedIn") {
                getUserGroups().then((result) => {
                    setGroup(result);
                });
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const getUserGroups = async () => {
        const session = await fetchAuthSession();
        if (!session || !session.tokens) return ""

        const groups = session.tokens.accessToken.payload["cognito:groups"];
        if (groups) return groups[0];

        return "";
    };

    return (
        <div className="py-1 min-h-screen bg-gray-50 flex items-center justify-center bg-[url(/user-login-bg.webp)] bg-cover bg-fixed bg-blend-luminosity">

            <div className="w-full p-2">
                <Authenticator components={components}>
                    {({ signOut }) => {
                        if (loading) return (
                            <Box className="flex items-center justify-center text-sladeGreen">
                                <CircularProgress color="inherit" size="6rem" />
                            </Box>
                        )

                        if (group === "ADMINS") return <Admin onLogout={signOut} />;

                        return <Registration />;
                    }}
                </Authenticator>
            </div>
        </div>
    );
};

export default Home;
