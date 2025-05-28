import { getChildren } from "../../apis/guardian";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";

const Confirmation = () => {
  const [children, setChildren] = useState([]);
  const [childrenError, setChildrenError] = useState("");
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);
  const [guardianId, setGuardianId] = useState("");

  useEffect(() => {
    if (!guardianId) return;
    setIsLoadingChildren(true);
    setChildrenError("");
    getChildren(guardianId)
      .then((data) => {
        setChildren(data || []);
        setIsLoadingChildren(false);
      })
      .catch(() => {
        setChildren([]);
        setChildrenError("Failed to fetch children.");
        setIsLoadingChildren(false);
      });
  }, [guardianId]);

  return (
    <Authenticator>
      {({ signOut, user }) => {
        useEffect(() => {
          if (user && user.signInDetails && user.signInDetails.loginId) {
            setGuardianId(user.signInDetails.loginId);
          }
        }, [user]);
        return (
          <div className="min-h-[60vh] flex items-center justify-center py-5">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl text-center">
              <h1 className="text-3xl font-semibold text-center text-[#222831] mb-4">
                Registration Successful!
              </h1>
              <br />
              <p className="font-galindo text-2xl">
                Thank you for registering.
              </p>
              <br />
              <p>
                Here are the login details for your child(ren):
              </p>
              {/* Show children table if available */}
              {isLoadingChildren && (
                <div className="mt-6 text-lg text-gray-500">Loading children...</div>
              )}
              {childrenError && (
                <div className="mt-6 text-red-500 font-bold">{childrenError}</div>
              )}
              {children.length > 0 && (
                <div className="overflow-x-auto mt-6">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Emoji</th>
                      </tr>
                    </thead>
                    <tbody>
                      {children.map((child, idx) => (
                        <tr key={child.childId || idx}>
                          <td className="border px-4 py-2">{child.firstName}</td>
                          <td className="border px-4 py-2 text-2xl">{child.emoji}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <Button isFullWidth={true} variation="link" colorTheme="success" onClick={signOut} marginTop="1em">Sign Out</Button>
            </div>
          </div>
        );
      }}
    </Authenticator>
  );
};

export default Confirmation;
