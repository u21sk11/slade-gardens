import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { auditCreate, auditError } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Registers a guardian and their children
 */
export async function registerGuardian(newGuardian, children) {
  try {
    const guardianCheck = await client.models.Playground.get({
      childId: childId,
    });
    const { errors: checkError } = guardianCheck;
    if (checkError) throw new Error(checkError[0].message);
    if (guardianCheck) throw new Error("Guardian already registered");
  
    const guardianResponse = await client.models.Guardian.create({
      guardianId: uuidv4(),
      firstName: newGuardian.firstName,
      lastName: newGuardian.lastName,
    });
    const { errors: guardianCreateError } = guardianResponse;
    if (guardianCreateError) throw new Error(guardianCreateError[0].message);

    auditCreate(guardianResponse.data.guardianId, null);

  } catch (error) {
    console.error("Error registering guardian: " + error);
  }
}
