import { Button } from "@aws-amplify/ui-react";

const ThirdStep = (props) => {
    const validate = () => {
        props.setError("");
        let isValid = true;

        if (!props.permissions.photos || !props.permissions.emails || !props.permissions.terms) {
            props.setError("Please fill in all required fields.");
            isValid = false;
        }

        if (isValid) props.setStep(3);
    };

    return <div className="mb-2">
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Permissions</h3>
            <div className="mb-4">
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
                            checked={props.permissions.photos === "yes"}
                            onChange={(e) => props.setPermissions({ ...props.permissions, photos: e.target.value })}
                            required />
                        {" "}Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="photos"
                            value="no"
                            checked={props.permissions.photos === "no"}
                            onChange={(e) => props.setPermissions({ ...props.permissions, photos: e.target.value })}
                            required />
                        {" "}No
                    </label>
                </div>
            </div>
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
                            checked={props.permissions.emails === "yes"}
                            onChange={(e) => props.setPermissions({ ...props.permissions, emails: e.target.value })}
                            required />
                        {" "}Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="emails"
                            value="no"
                            checked={props.permissions.emails === "no"}
                            onChange={(e) => props.setPermissions({ ...props.permissions, emails: e.target.value })}
                            required />
                        {" "}No
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Do you agree to the{" "}
                    <button
                        type="button"
                        className="text-blue-500 hover:underline bg-transparent border-none p-0 m-0 cursor-pointer"
                        onClick={() => props.setStep(0)}>
                        terms and conditions
                    </button>?*
                </label>
                <div className="flex items-center space-x-4">
                    <label>
                        <input
                            type="radio"
                            name="terms"
                            value="yes"
                            checked={props.permissions.terms === "yes"}
                            onChange={(e) => props.setPermissions({ ...props.permissions, terms: e.target.value })}
                            required />
                        {" "}Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="terms"
                            value="no"
                            checked={props.permissions.terms === "no"}
                            onChange={(e) => props.setPermissions({ ...props.permissions, terms: e.target.value })}
                            required />
                        {" "}No
                    </label>
                </div>
            </div>
        </div>
        <div className="mb-6">
            <label htmlFor="referralSource" className="block text-gray-700">How did you hear about Slade Gardens?</label>
            <input
                type="text"
                id="referralSource"
                value={props.referralSource}
                onChange={(e) => props.setReferralSource(e.target.value)}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
        <div className="flex justify-center mt-2">
            <Button marginRight="1rem" isFullWidth={true} variation="primary" colorTheme="success" onClick={() => { props.setStep(2); props.setError(""); }}>Previous</Button>
            <Button type="submit" isDisabled={props.isLoading} loadingText="Registering..." marginLeft="1rem" isFullWidth={true} variation="primary" colorTheme="success" onClick={() => { validate(); }}>Submit</Button>
        </div>
    </div>;
}

export default ThirdStep;