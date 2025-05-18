import React, { useState } from "react";
import { register } from "../../apis/register";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../../amplify_outputs.json";

Amplify.configure(outputs);

function Registration() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);

  const currentYear = new Date().getFullYear();
  const youngestDob = new Date(
    currentYear - 6,
    new Date().getMonth(),
    new Date().getDate()
  )
    .toISOString()
    .split("T")[0];
  const oldestDob = new Date(
    currentYear - 21,
    new Date().getMonth(),
    new Date().getDate()
  )
    .toISOString()
    .split("T")[0];

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

  // ---------------------------- FOR GUARDIAN REGISTRATION ----------------------------

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
  const [permissions, setPermissions] = useState({
    photos: "",
    emails: "",
    terms: "",
  });
  const [referralSource, setReferralSource] = useState("");

  const handleChildChange = (index, field, value) => {
    const updatedChildren = [...children];
    updatedChildren[index][field] = value;
    setChildren(updatedChildren);
  };

  const addChild = () => {
    setChildren([
      ...children,
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
    const updatedChildren = children.filter((_, i) => i !== index);
    setChildren(updatedChildren);
  };

  // --------------------------------------------------------------------------------

  const handleSubmit = async (e, email) => {
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
      navigate("/confirmation", {
        state: {
          firstNames: children.map((child) => child.firstName),
          emojis: result.assignedEmojis,
        },
      });
    } else {
      setError("Unable to process registration, please try again.");
    }
    setIsLoading(false);
  };

  const ProgressBar = ({ step }) => (
    <div className="flex justify-between mb-6">
      <div
        className={`flex-1 ${
          step >= 1 ? "bg-green-500" : "bg-gray-300"
        } h-2 rounded-l-lg`}
      ></div>
      <div
        className={`flex-1 ${step >= 2 ? "bg-green-500" : "bg-gray-300"} h-2`}
      ></div>
      <div
        className={`flex-1 ${
          step >= 3 ? "bg-green-500" : "bg-gray-300"
        } h-2 rounded-r-lg`}
      ></div>
    </div>
  );

  const handleNext = () => {
    setError("");
    let isValid = false;
    switch (step) {
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
    if (isValid) {
      setStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const validateStep1 = () => {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !addressLine1 ||
      !city ||
      !postcode
    ) {
      setError("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    for (const child of children) {
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
        setError(
          "Please fill in all required fields for each child and ensure the date of birth is within the valid range."
        );
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!permissions.photos || !permissions.emails || !permissions.terms) {
      setError("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const renderStepContent = (step, user) => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3 className="text-lg text-center font-semibold text-[#222831] mb-4">
              Welcome!
            </h3>
            <p className="text-sm text-center text-[#222831] mb-6">
              Slade Gardens is an open access play facility for children aged
              between 6-21 years.
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              <a
                href="https://forms.gle/RovQnvuMLh51BhjB7"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Under 5s Free Stay and Play Registration Form
              </a>
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              <b>We are not a childcare facility.</b>
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              The Adventure Playground is a place where children come to learn,
              grow and have fun whilst experiencing risk and challenge through
              their play. The playground staff team are all experienced to
              ensure that the play that children engage in here will be as
              "safe" as it possibly can.
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              Occasionally we may take photographs of the children whilst they
              are playing on structures or in the Hut for publicity purposes,
              please share your permission in this form and also inform a member
              of staff if you do not wish for your child's face to be included
              in any photographs.
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              The following information that you enter will remain confidential
              and is be used for monitoring services with the Local Council,
              Department of Education and some grant funders. Funders now
              require evidence of your eligibility for Free School Meals. Please
              provide accurate information as the information provided is cross
              checked.
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              We ask that users sign in and out each time they join us.
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              The Adventure Play Ground is free at point of entry and all guests
              must be pre registered. Thanks for registering your child(ren)
              today... and tell your friends about us!
            </p>
            <p className="text-sm text-center text-[#222831] mb-2">
              Follow us on social media <b>@sladeadventure</b> for updates and
              news of special events.
            </p>
            <p className="text-sm text-center text-[#222831] mb-6">
              <a
                href="https://www.facebook.com/SladeAdventure"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Facebook
              </a>{" "}
              |{" "}
              <a
                href="https://www.instagram.com/sladeadventure/"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Instagram
              </a>{" "}
              |{" "}
              <a
                href="https://x.com/sladeadventure"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                X
              </a>
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-[#6FB545] text-white px-4 py-2 rounded-md hover:bg-[#078543] focus:outline-none"
              >
                Start Registration
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            {/* Guardian details form Fields */}

            {/* First Name and Last Name Fields */}
            <div className="mb-4 flex space-x-6">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-[#222831] font-medium"
                >
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-[#222831] font-medium"
                >
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[#222831] font-medium"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                value={user.signInDetails.loginId}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                required
                disabled
              />
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-[#222831] font-medium"
              >
                Phone Number*
              </label>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                required
              />
            </div>

            {/* Address Line 1 Field */}
            <div className="mb-4">
              <label
                htmlFor="addressLine1"
                className="block text-[#222831] font-medium"
              >
                Address Line 1*
              </label>
              <input
                type="text"
                id="addressLine1"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                required
              />
            </div>

            {/* Address Line 2 Field */}
            <div className="mb-4">
              <label
                htmlFor="addressLine2"
                className="block text-[#222831] font-medium"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
              />
            </div>

            {/* City and Postcode Fields */}
            <div className="mb-4 flex space-x-6">
              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="block text-[#222831] font-medium"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="postcode"
                  className="block text-[#222831] font-medium"
                >
                  Postcode*
                </label>
                <input
                  type="text"
                  id="postcode"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                  required
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none"
                >
                  Previous
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#6FB545] text-white px-4 py-2 rounded-md hover:bg-[#078543] focus:outline-none"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            {/* Children form Fields */}
            {
              <>
                {children.map((child, index, guardianId) => (
                  <div
                    key={guardianId + index}
                    className="mb-6 border-t border-gray-300 pt-4"
                  >
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">
                      Child {index + 1}
                      {children.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChild(index)}
                          className="ml-4 text-red-500 text-sm hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </h3>

                    {/* Child details form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name Field */}
                      <input
                        type="text"
                        placeholder="First Name*"
                        value={child.firstName}
                        onChange={(e) =>
                          handleChildChange(index, "firstName", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      />

                      {/* Last Name Field */}
                      <input
                        type="text"
                        placeholder="Last Name*"
                        value={child.lastName}
                        onChange={(e) =>
                          handleChildChange(index, "lastName", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      />

                      {/* Gender Selection */}
                      <select
                        value={child.gender}
                        onChange={(e) =>
                          handleChildChange(index, "gender", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Gender*</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="NON_BINARY">Non-binary</option>
                        <option value="OTHER">Other</option>
                        <option value="SKIP">Prefer not to say</option>
                      </select>

                      {/* Date of Birth Field */}
                      <input
                        type="date"
                        placeholder="Date of Birth*"
                        value={child.dob}
                        min={oldestDob}
                        max={youngestDob}
                        onChange={(e) =>
                          handleChildChange(index, "dob", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      />

                      {/* Ethnicity Main Group Selection */}
                      <div className="col-span-full">
                        <select
                          value={child.ethnicityMainGroup || ""}
                          onChange={(e) => {
                            handleChildChange(
                              index,
                              "ethnicityMainGroup",
                              e.target.value
                            );
                            handleChildChange(index, "ethnicity", "");
                          }}
                          className="p-3 border border-gray-300 rounded-md w-full"
                          required
                        >
                          {ethnicityMainGroups.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Ethnicity Sub-group Selection */}
                      {child.ethnicityMainGroup &&
                        child.ethnicityMainGroup !== "" && (
                          <div className="col-span-full">
                            <select
                              value={child.ethnicity}
                              onChange={(e) =>
                                handleChildChange(
                                  index,
                                  "ethnicity",
                                  e.target.value
                                )
                              }
                              className="p-3 border border-gray-300 rounded-md w-full"
                              required
                            >
                              <option value="">Select Sub-group*</option>
                              {ethnicityGroups[child.ethnicityMainGroup].map(
                                (opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        )}

                      {/* Permission to Leave Selection */}
                      <div className="col-span-full">
                        <select
                          value={child.permissionToLeave}
                          onChange={(e) =>
                            handleChildChange(
                              index,
                              "permissionToLeave",
                              e.target.value === "true"
                            )
                          }
                          className="p-3 border border-gray-300 rounded-md w-full"
                          required
                        >
                          <option value="">Permission to leave?*</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>

                      {/* School Field */}
                      <input
                        type="text"
                        placeholder="School*"
                        value={child.school}
                        onChange={(e) =>
                          handleChildChange(index, "school", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      />

                      {/* Free School Meals Selection */}
                      <select
                        value={child.freeSchoolMeals}
                        onChange={(e) =>
                          handleChildChange(
                            index,
                            "freeSchoolMeals",
                            e.target.value === "true"
                          )
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">
                          Eligible for free school meals?*
                        </option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>

                      {/* Allergies Field */}
                      <input
                        type="text"
                        placeholder="Any Allergies?"
                        value={child.allergies}
                        onChange={(e) =>
                          handleChildChange(index, "allergies", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                      />

                      {/* Special Needs Field */}
                      <input
                        type="text"
                        placeholder="Disabilities / Special Needs?"
                        value={child.specialNeeds}
                        onChange={(e) =>
                          handleChildChange(
                            index,
                            "specialNeeds",
                            e.target.value
                          )
                        }
                        className="p-3 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                ))}

                {/* Add Child Button */}
                <button
                  type="button"
                  onClick={addChild}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
                >
                  + Add Child
                </button>
              </>
            }

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400 focus:outline-none mr-4"
                >
                  Previous
                </button>
              )}
              {step < 3 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#6FB545] text-white px-4 py-2 rounded-xl hover:bg-[#078543] focus:outline-none ml-4"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        );
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
                  <a href="#" className="text-blue-500 hover:underline">
                    terms and conditions
                  </a>
                  ?*
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
                onClick={handlePrevious}
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
    <Authenticator>
      {({ signOut, user }) => {
        return (
          <div className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-xl mt-5">
            <Button onClick={signOut}>Sign Out</Button>
            {/* Title and Disclaimer Text */}
            <h2 className="text-3xl font-semibold text-center text-[#222831] mb-4">
              Registration
            </h2>
            <p className="text-sm text-center text-[#6FB545] mb-6">
              Please note: Slade Gardens Adventure Playground is not a childcare
              facility.
            </p>

            {/* Registration Form */}
            <form onSubmit={(e) => handleSubmit(e, user.signInDetails.loginId)}>
              <ProgressBar step={step} />
              {renderStepContent(step, user)}
              {/* Additional Fields for Guardian Registration */}

              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
            </form>
          </div>
        );
      }}
    </Authenticator>
  );
}

export default Registration;
