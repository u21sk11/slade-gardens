import { useState } from "react";
import { register } from "../../apis/register";
import { Button, Loader } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data"

import Disclaimer from "./steps/Disclaimer";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";
import ThirdStep from "./steps/ThirdStep";

const Registration = (props) => {
    const navigate = useNavigate();
    // Common State
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [error, setError] = useState("");

    // Step 1 State
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");

    // Step 2 State
    const [children, setChildren] = useState([
        {
            firstName: "",
            lastName: "",
            gender: "",
            ethnicityMainGroup: "",
            ethnicity: "",
            dob: "",
            school: "",
            allergies: "",
            specialNeeds: "",
            freeSchoolMeals: "",
            permissionToLeave: "",
        },
    ]);

    // Step 3 State
    const [permissions, setPermissions] = useState({
        photos: "",
        emails: "",
        terms: "",
    });
    const [referralSource, setReferralSource] = useState("");

    const handleSubmit = async (e, email, username) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        if (permissions.terms !== "yes") {
            setError("Terms and conditions must be accepted.");
            setIsLoading(false);
            return;
        }

        const newGuardian = {
            firstName,
            lastName,
            email,
            addressLine1,
            addressLine2,
            city,
            postcode,
            phoneNumber,
            permissions,
            referralSource,
        };

        const result = await register(newGuardian, children);

        if (result.successful) {
            const client = generateClient({ authMode: "userPool" });

            await client.mutations.addUserToGroup({
                userId: username,
            });

            await client.mutations.removeUserFromGroup({
                userId: username,
            });

            navigate(0);
        } else {
            setError("Unable to process registration, please try again.");
        }
        setIsLoading(false);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return <Disclaimer setStep={setStep} />
            case 1:
                return <FirstStep
                    user={props.user}
                    setStep={setStep}
                    setError={setError}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    addressLine1={addressLine1}
                    setAddressLine1={setAddressLine1}
                    addressLine2={addressLine2}
                    setAddressLine2={setAddressLine2}
                    city={city}
                    setCity={setCity}
                    postcode={postcode}
                    setPostcode={setPostcode} />
            case 2:
                return <SecondStep
                    setStep={setStep}
                    setError={setError}
                    children={children}
                    setChildren={setChildren} />
            case 3:
                return <ThirdStep
                    setStep={setStep}
                    setError={setError}
                    permissions={permissions}
                    setPermissions={setPermissions}
                    referralSource={referralSource}
                    setReferralSource={setReferralSource}
                    isLoading={isLoading} />
            default:
                return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-white shadow-md rounded-xl m-10">
            <h2 className="text-3xl font-semibold text-center text-[#222831] mb-4">Registration</h2>
            <p className="text-sm text-center text-sladeGreen-dark mb-6">Please note: Slade Gardens Adventure Playground is not a childcare facility.</p>
            <form onSubmit={(e) => handleSubmit(e, props.user.signInDetails.loginId, props.user.username)}>
                <Loader variation="linear" isDeterminate isPercentageTextHidden percentage={step / 4 * 100} />
                {renderStepContent(step)}
                <Button isFullWidth={true} variation="link" colorTheme="success" onClick={props.signOut}>Sign Out</Button>
                {error && <p className="text-red-800 text-center mb-4 mt-2">{error}</p>}
            </form>
        </div>
    );
}

export default Registration;