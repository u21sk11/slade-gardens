import { Button } from "@aws-amplify/ui-react";

const FirstStep = (props) => {
    const validate = () => {
        props.setError("");
        let field = "";

        if (!props.firstName) field = "First Name";
        if (!props.lastName) field = "Last Name";
        if (!props.phoneNumber) field = "Phone Number";
        if (!props.addressLine1) field = "Address Line 1";
        if (!props.city) field = "City";
        if (!props.postcode) field = "Postcode";

        if (field === "") props.setStep(2);
        else props.setError(`Looks like you missed filling out the '${field}' field.`)
    };

    return <div className="mb-2">
        <div className="mb-4 flex space-x-6">
            <div className="flex-1">
                <label htmlFor="firstName" className="block text-[#222831] font-medium">First Name*</label>
                <input
                    type="text"
                    id="firstName"
                    value={props.firstName}
                    onChange={(e) => props.setFirstName(e.target.value)}
                    className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                    required />
            </div>
            <div className="flex-1">
                <label htmlFor="lastName" className="block text-[#222831] font-medium">Last Name*</label>
                <input
                    type="text"
                    id="lastName"
                    value={props.lastName}
                    onChange={(e) => props.setLastName(e.target.value)}
                    className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                    required />
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-[#222831] font-medium">Email*</label>
            <input
                type="email"
                id="email"
                value={props.user.signInDetails.loginId}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                required
                disabled />
        </div>
        <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-[#222831] font-medium">Phone Number*</label>
            <input
                type="tel"
                id="phoneNumber"
                value={props.phoneNumber}
                onChange={(e) => props.setPhoneNumber(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                required />
        </div>
        <div className="mb-4">
            <label htmlFor="addressLine1" className="block text-[#222831] font-medium">Address Line 1*</label>
            <input
                type="text"
                id="addressLine1"
                value={props.addressLine1}
                onChange={(e) => props.setAddressLine1(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                required />
        </div>
        <div className="mb-4">
            <label htmlFor="addressLine2" className="block text-[#222831] font-medium">Address Line 2</label>
            <input
                type="text"
                id="addressLine2"
                value={props.addressLine2}
                onChange={(e) => props.setAddressLine2(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]" />
        </div>
        <div className="mb-4 flex space-x-6">
            <div className="flex-1">
                <label htmlFor="city" className="block text-[#222831] font-medium">City*</label>
                <input
                    type="text"
                    id="city"
                    value={props.city}
                    onChange={(e) => props.setCity(e.target.value)}
                    className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                    required />
            </div>
            <div className="flex-1">
                <label htmlFor="postcode" className="block text-[#222831] font-medium">Postcode*</label>
                <input
                    type="text"
                    id="postcode"
                    value={props.postcode}
                    onChange={(e) => props.setPostcode(e.target.value)}
                    className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                    required />
            </div>
        </div>
        <div className="flex justify-center">
            <Button marginRight="1rem" isFullWidth={true} variation="primary" colorTheme="success" onClick={() => { props.setStep(0); props.setError("") }}>Previous</Button>
            <Button marginLeft="1rem" isFullWidth={true} variation="primary" colorTheme="success" onClick={validate}>Next</Button>
        </div>
    </div>;
}
export default FirstStep;