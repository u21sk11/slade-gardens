import { Button } from "@aws-amplify/ui-react";

const SecondStep = (props) => {
    const ethnicityGroups = {
        ASIAN: [
            { value: "INDIAN", label: "Indian" },
            { value: "PAKISTANI", label: "Pakistani" },
            { value: "BANGLADESHI", label: "Bangladeshi" },
            { value: "CHINESE", label: "Chinese" },
            { value: "OTHER_ASIAN", label: "Any other Asian background" },
        ],
        BLACK: [
            { value: "AFRICAN", label: "African" },
            { value: "CARIBBEAN", label: "Caribbean" },
            {
                value: "OTHER_BLACK",
                label: "Any other Black, Black British, or Caribbean background",
            },
        ],
        MIXED: [
            {
                value: "WHITE_AND_BLACK_CARIBBEAN",
                label: "White and Black Caribbean",
            },
            { value: "WHITE_AND_BLACK_AFRICAN", label: "White and Black African" },
            { value: "WHITE_AND_ASIAN", label: "White and Asian" },
            {
                value: "OTHER_MIXED",
                label: "Any other Mixed or multiple ethnic background",
            },
        ],
        WHITE: [
            {
                value: "WHITE_BRITISH",
                label: "English, Welsh, Scottish, Northern Irish or British",
            },
            { value: "WHITE_IRISH", label: "Irish" },
            { value: "WHITE_GYPSY_TRAVELLER", label: "Gypsy or Irish Traveller" },
            { value: "ROMA", label: "Roma" },
            { value: "WHITE_OTHER", label: "Any other White background" },
        ],
        OTHER: [
            { value: "ARAB", label: "Arab" },
            { value: "OTHER", label: "Any other ethnic group" },
            { value: "SKIP", label: "Prefer not to say" },
        ],
    };
    const ethnicityMainGroups = [
        { value: "", label: "Select Ethnicity Group*" },
        { value: "ASIAN", label: "Asian or Asian British" },
        { value: "BLACK", label: "Black, African, Caribbean or Black British" },
        { value: "MIXED", label: "Mixed or multiple ethnic groups" },
        { value: "WHITE", label: "White" },
        { value: "OTHER", label: "Other ethnic group" },
    ];
    const currentYear = new Date().getFullYear();
    const youngestDob = new Date(currentYear - 6, new Date().getMonth(), new Date().getDate())
        .toISOString()
        .split("T")[0];
    const oldestDob = new Date(currentYear - 21, new Date().getMonth(), new Date().getDate())
        .toISOString()
        .split("T")[0];

    const addChild = () => {
        props.setChildren([
            ...props.children,
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
    };

    const removeChild = (index) => {
        const updatedChildren = props.children.filter((_, i) => i !== index);
        props.setChildren(updatedChildren);
    };

    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...props.children];
        updatedChildren[index][field] = value;
        props.setChildren(updatedChildren);
    };

    const validate = () => {
        // props.setError("");
        // let field = "";

        // for (let i = 0; i < props.children.length; i++) {
        //     if (!props.children[i].firstName) field = `'First Name' field for child ${i}`;
        //     if (!props.children[i].lastName) field = `'Last Name' field for child ${i}`;
        //     if (!props.children[i].gender) field = `'Gender' field for child ${i}`;
        //     if (!props.children[i].ethnicity) field = `'Ethnicity Sub-Group' field for child ${i}`;
        //     if (!props.children[i].ethnicityMainGroup) field = `'Ethnicity Group' field for child ${i}`;

        //     if (!props.children[i].dob) field = `'Date of Birth' field for child ${i}`;
        //     else if(new Date(child.dob) > new Date(youngestDob)){
        //         field = "ensure the date of birth is within the valid range.";
        //     }else if(new Date(child.dob) < new Date(oldestDob)){}
        // }

        // if (field === "") props.setStep(2);
        // else props.setError(`Looks like you missed filling out the ${field} field.`)

        props.setError("");
        let isValid = true;

        for (const child of props.children) {
            if (
                !child.firstName ||
                !child.lastName ||
                !child.gender ||
                !child.ethnicityMainGroup ||
                !child.ethnicity ||
                !child.dob ||
                !child.school ||
                child.permissionToLeave === "" ||
                child.freeSchoolMeals === "" ||
                new Date(child.dob) < new Date(oldestDob) ||
                new Date(child.dob) > new Date(youngestDob)
            ) {
                props.setError("Please fill in all required fields for each child and ensure the date of birth is within the valid range.");
                isValid = false;
            }
        }

        if (isValid) props.setStep(3);
    };

    return (
        <div className="mb-2">
            {props.children.map((child, index, guardianId) => (
                <div key={guardianId + index} className="mb-6 border-t border-gray-300 pt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                        Child {index + 1}
                        {props.children.length > 1 && <Button marginLeft="0.5rem" variation="link" colorTheme="error" onClick={() => removeChild(index)}>Remove</Button>}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="First Name*"
                            value={child.firstName}
                            onChange={(e) => handleChildChange(index, "firstName", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required />
                        <input
                            type="text"
                            placeholder="Last Name*"
                            value={child.lastName}
                            onChange={(e) => handleChildChange(index, "lastName", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required />
                        <select
                            value={child.gender}
                            onChange={(e) => handleChildChange(index, "gender", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required>
                            <option value="">Gender*</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="NON_BINARY">Non-binary</option>
                            <option value="OTHER">Other</option>
                            <option value="SKIP">Prefer not to say</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Date of Birth*"
                            onFocus={(e) => { e.target.type = "date"; }}
                            onBlur={(e) => { e.target.type = "text"; }}
                            value={child.dob}
                            min={oldestDob}
                            max={youngestDob}
                            onChange={(e) => handleChildChange(index, "dob", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required />
                        <div className="col-span-full">
                            <select
                                value={child.ethnicityMainGroup || ""}
                                onChange={(e) => {
                                    handleChildChange(index, "ethnicityMainGroup", e.target.value);
                                    handleChildChange(index, "ethnicity", "");
                                }}
                                className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F] w-full"
                                required>
                                {ethnicityMainGroups.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                        {child.ethnicityMainGroup && child.ethnicityMainGroup !== "" && (
                            <div className="col-span-full">
                                <select
                                    value={child.ethnicity}
                                    onChange={(e) => handleChildChange(index, "ethnicity", e.target.value)}
                                    className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F] w-full"
                                    required>
                                    <option value="">Select Sub-group*</option>
                                    {ethnicityGroups[child.ethnicityMainGroup].map(
                                        (opt) => (<option key={opt.value} value={opt.value}>{opt.label}</option>)
                                    )}
                                </select>
                            </div>
                        )}
                        <div className="col-span-full">
                            <select
                                value={child.permissionToLeave}
                                onChange={(e) => handleChildChange(index, "permissionToLeave", e.target.value === "true")}
                                className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F] w-full"
                                required>
                                <option value="">Permission to leave?*</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="School*"
                            value={child.school}
                            onChange={(e) => handleChildChange(index, "school", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required />
                        <select
                            value={child.freeSchoolMeals}
                            onChange={(e) => handleChildChange(index, "freeSchoolMeals", e.target.value === "true")}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required>
                            <option value="">Eligible for free school meals?*</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Any Allergies?"
                            value={child.allergies}
                            onChange={(e) => handleChildChange(index, "allergies", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]" />
                        <input
                            type="text"
                            placeholder="Disabilities / Special Needs?"
                            value={child.specialNeeds}
                            onChange={(e) => handleChildChange(index, "specialNeeds", e.target.value)}
                            className="p-3 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]" />
                    </div>
                </div>
            ))}

            <Button isFullWidth={true} variation="primary" colorTheme="warning" onClick={addChild}>+ Add Child</Button>
            <div className="flex justify-center mt-2">
                <Button marginRight="1rem" isFullWidth={true} variation="primary" colorTheme="success" onClick={() => { props.setStep(1); props.setError("") }}>Previous</Button>
                <Button marginLeft="1rem" isFullWidth={true} variation="primary" colorTheme="success" onClick={validate}>Next</Button>
            </div>
        </div>
    );
}

export default SecondStep;