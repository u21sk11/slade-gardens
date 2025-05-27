import { useState } from "react";
import { register } from "../../apis/register";
import { Button, Loader } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data"

import Disclaimer from "./steps/Disclaimer";
import FirstStep from "./steps/FirstStep";
import SecondStep from "./steps/SecondStep";

function Registration(props) {
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

    // ---------------------------- FOR GUARDIAN REGISTRATION ----------------------------


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

    const handleNext = (nextStep) => {
        setError("");
        let isValid = false;

        switch (nextStep) {
            case 1:
                isValid = validateStep1();
                break;
            case 2:
                isValid = validateStep2();
                break;
            case 3:
                isValid = validateStep3();
                break;
            default:
                isValid = true;
        }

        if (isValid) setStep(nextStep);
    };

    const validateStep3 = () => {
        if (!permissions.photos || !permissions.emails || !permissions.terms) {
            setError("Please fill in all required fields.");
            return false;
        }
        return true;
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
                return (
                    <div>
                        {/* Additional details form Fields */}

                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                Permissions
                            </h3>
                            <div className="mb-4">
                                {/* Photo Permissions Fields */}
                                <label className="block text-gray-700">
                                    Do we have your permission for your child's photographs/videos
                                    to be used on our social media or marketing?*
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name="photos"
                                            value="yes"
                                            checked={permissions.photos === "yes"}
                                            onChange={(e) =>
                                                setPermissions({
                                                    ...permissions,
                                                    photos: e.target.value,
                                                })
                                            }
                                            required
                                        />{" "}
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="photos"
                                            value="no"
                                            checked={permissions.photos === "no"}
                                            onChange={(e) =>
                                                setPermissions({
                                                    ...permissions,
                                                    photos: e.target.value,
                                                })
                                            }
                                            required
                                        />{" "}
                                        No
                                    </label>
                                </div>
                            </div>

                            {/* Email Permissions Fields */}
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    May we occasionally email you with news and notices of our
                                    community events?*
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name="emails"
                                            value="yes"
                                            checked={permissions.emails === "yes"}
                                            onChange={(e) =>
                                                setPermissions({
                                                    ...permissions,
                                                    emails: e.target.value,
                                                })
                                            }
                                            required
                                        />{" "}
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="emails"
                                            value="no"
                                            checked={permissions.emails === "no"}
                                            onChange={(e) =>
                                                setPermissions({
                                                    ...permissions,
                                                    emails: e.target.value,
                                                })
                                            }
                                            required
                                        />{" "}
                                        No
                                    </label>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Do you agree to the{" "}
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
                                        onClick={() => setStep(0)}>
                                        terms and conditions
                                    </button>?*
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label>
                                        <input
                                            type="radio"
                                            name="terms"
                                            value="yes"
                                            checked={permissions.terms === "yes"}
                                            onChange={(e) =>
                                                setPermissions({
                                                    ...permissions,
                                                    terms: e.target.value,
                                                })
                                            }
                                            required
                                        />{" "}
                                        Yes
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="terms"
                                            value="no"
                                            checked={permissions.terms === "no"}
                                            onChange={(e) =>
                                                setPermissions({
                                                    ...permissions,
                                                    terms: e.target.value,
                                                })
                                            }
                                            required
                                        />{" "}
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* How did you hear Field */}
                        <div className="mb-6">
                            <label htmlFor="referralSource" className="block text-gray-700">
                                How did you hear about Slade Gardens?
                            </label>
                            <input
                                type="text"
                                id="referralSource"
                                value={referralSource}
                                onChange={(e) => setReferralSource(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 mt-4 bg-[#6FB545] text-white rounded-md hover:bg-[#078543] focus:outline-none"
                            disabled={isLoading}
                        >
                            {isLoading ? "Registering..." : "Submit"}
                        </button>

                        {/* Navigation Buttons */}
                        <div className="flex justify-center mt-6">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400 focus:outline-none"
                            >
                                Previous
                            </button>
                        </div>
                    </div>
                );
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