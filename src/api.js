import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function createTestData() {
  try {
    const  guardianResponse = await client.models.Guardian.create({
      guardianId: uuidv4(),
      firstName: "John",
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
    console.log("guardianResponse Response:", guardianResponse);
    const { errors: guardianErrors, data: newGuardian } = guardianResponse;
    if (guardianErrors) {
        console.log("Guardian Response:", guardianErrors);
        throw new Error(`Guardian creation failed: ${guardianErrors[0].message}`);
      }
    console.log("New Guardian Created:", newGuardian);

    const childResponse = await client.models.Child.create({
      childId: uuidv4(),
      guardianId: guardianResponse?.data?.guardianId, // Link to the created Guardian
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
      activePlaygroundId: uuidv4(),
      auditEntry: uuidv4(),
    });
    console.log("Child Response:", childResponse);
    const { data: newChild } = childResponse;
    console.log("New Child Created:", newChild);

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
