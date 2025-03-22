import React, { useState } from "react";
import { register } from "../../apis/register";
import { Authenticator, Button } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../../amplify_outputs.json";

Amplify.configure(outputs);

function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const currentYear = new Date().getFullYear();
  const youngestDob = new Date(
    currentYear - 6,
    new Date().getMonth(),
    new Date().getDate()
  )
    .toISOString()
    .split("T")[0];
  const oldestDob = new Date(
    currentYear - 16,
    new Date().getMonth(),
    new Date().getDate()
  )
    .toISOString()
    .split("T")[0];

  // ---------------------------- FOR GUARDIAN REGISTRATION ----------------------------

  const [children, setChildren] = useState([
    {
      firstName: "",
      lastName: "",
      gender: "",
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
    setLoading(true);

    if (permissions.terms !== "yes") {
      setError("Terms and conditions must be accepted.");
      setLoading(false);
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

    // Call the register function from the API
    const result = await register(newGuardian, children);

    console.log("Result:" + JSON.stringify(result));

    if (result.successful) {
      // TODO: Registration complete page confirming children's emojis?
    } else {
      setError("Unable to process registration, please try again.");
    }
    setLoading(false);
  };

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="py-10 bg-white p-10 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <Button onClick={signOut}>Sign Out</Button>
          {/* Title and Disclaimer Text */}
          <h2 className="text-3xl font-semibold text-center text-[#222831] mb-4">
            Register
          </h2>
          <p className="text-sm text-center text-[#6FB545] mb-6">
            Please note: Slade Gardens Adventure Playground is not a childcare
            facility.
          </p>

          {/* Registration Form */}
          <form onSubmit={(e) => handleSubmit(e, user.signInDetails.loginId)}>
            <div className="mb-4 flex space-x-6">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-[#222831] font-medium"
                >
                  First Name:
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
                  Last Name:
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
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[#222831] font-medium"
              >
                Email Address:
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
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-[#222831] font-medium"
              >
                Phone Number:
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

            {/* Address Fields */}
            <div className="mb-4">
              <label
                htmlFor="addressLine1"
                className="block text-[#222831] font-medium"
              >
                Address Line 1:
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
            <div className="mb-4">
              <label
                htmlFor="addressLine2"
                className="block text-[#222831] font-medium"
              >
                Address Line 2:
              </label>
              <input
                type="text"
                id="addressLine2"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
              />
            </div>
            <div className="mb-4 flex space-x-6">
              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="block text-[#222831] font-medium"
                >
                  City:
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
                  Postcode:
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

            {/* Additional Fields for Guardian Registration */}
            {
              <>
                {children.map((child, index) => (
                  <div
                    key={child.firstName + index}
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <option value="NONBINARY">Non-Binary</option>
                        <option value="OTHER">Other</option>
                      </select>
                      <select
                        value={child.ethnicity}
                        onChange={(e) =>
                          handleChildChange(index, "ethnicity", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Ethnicity*</option>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                        <option value="asian">Asian</option>
                        <option value="mixed">Mixed</option>
                        <option value="other">Other</option>
                      </select>
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
                      <select
                        value={child.permissionToLeave}
                        onChange={(e) =>
                          handleChildChange(
                            index,
                            "permissionToLeave",
                            e.target.value === "true"
                          )
                        }
                        className="p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Permission to leave?*</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
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
                      <input
                        type="text"
                        placeholder="Any Allergies?"
                        value={child.allergies}
                        onChange={(e) =>
                          handleChildChange(index, "allergies", e.target.value)
                        }
                        className="p-3 border border-gray-300 rounded-md"
                      />
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

                <button
                  type="button"
                  onClick={addChild}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
                >
                  + Add Child
                </button>
                {/* Permissions */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Permissions
                  </h3>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Do we have your permission for your child's
                      photographs/videos to be used on our social media or
                      marketing?*
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

                {/* How did you hear */}
                <div className="mb-6">
                  <label
                    htmlFor="referralSource"
                    className="block text-gray-700"
                  >
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
              </>
            }

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#6FB545] text-white rounded-md hover:bg-[#078543] focus:outline-none"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      )}
    </Authenticator>
  );
}

export default Registration;
