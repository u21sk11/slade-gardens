import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditError, auditCreate } from "./apis/audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function createTestData(form) {
  console.log("!!! Creating Test Data !!!" + form);
  console.log("! Form Name: ", form.get("name"));
  try {
    const guardianResponse = await client.models.Guardian.create({
      guardianId: uuidv4(),
      firstName: form.get("name"),
      lastName: "Doe",
      email: "john.doe@example.com",
      addressLine1: "123 Main St",
      addressLine2: "",
      city: "Anytown",
      postcode: "12345",
      phoneNumber: "++447922347913",
      permissionMedia: true,
      permissionContact: true,
      referralSource: "Friend",
    });
    const { errors: guardianErrors, data: newGuardian } = guardianResponse;
    if (guardianErrors) {
      auditError("Guardian creation failed: " + guardianErrors[0].message);
      throw new Error(`Guardian creation failed: ${guardianErrors[0].message}`);
    }
    auditCreate(newGuardian?.guardianId, null);

    const childResponse = await client.models.Child.create({
      childId: uuidv4(),
      guardianId: newGuardian?.guardianId,
      firstName: "Jane",
      lastName: "Doe",
      gender: "FEMALE",
      ethnicity: "Caucasian",
      dob: "2015-05-15",
      school: "Anytown Elementary",
      allergies: "None",
      disabilities: "None",
      freeSchoolMeals: true,
      permissionToLeave: true,
      playgroundEntry: uuidv4(),
      auditEntry: uuidv4(),
    });
    console.log("Child Response:", childResponse);
    const { errors: childErrors, data: newChild } = childResponse;
    console.log("New Child Created:", newChild);
    if (childErrors) {
        auditError("Child creation failed: " + childErrors[0].message);
        throw new Error(`Child creation failed: ${childErrors[0].message}`);
      }
      auditCreate(null, newChild?.childId);

    const playgroundResponse = await client.models.Playground.create({
      childId: childResponse?.data?.childId,
    });
    console.log("Playground Response:", playgroundResponse);
    const { data: newPlayground } = playgroundResponse;
    console.log("New Playground Created:", newPlayground);
  } catch (error) {
    console.error("Error creating child:", error);
  }
}
