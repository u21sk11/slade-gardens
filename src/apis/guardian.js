import { generateClient, get } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditError } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function getGuardian(guardianId) {
  try {
    const guardian = await client.models.Guardian.get({
      guardianId: guardianId,
    });
    return guardian;
  } catch (error) {
    auditError("Error fetching guardian: " + error);
    throw error;
  }
}