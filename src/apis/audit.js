import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function auditError(message) {
  try {
    const auditEntryResponse = await client.models.Audit.create({
      auditId: uuidv4(),
      eventType: "ERROR",
      message: message,
    });
  } catch (error) {
    console.error("Error creating audit entry for ERROR:", error);
  }
}

export async function audit() {
  try {
    const auditEntryResponse = await client.models.Audit.create({
      auditId: uuidv4(),
      eventType: "",
      message: "",
    });
    console.log("Audit Entry Response:", auditEntryResponse);
  } catch (error) {
    console.error("Error creating audit entry for ERROR:", error);
  }
}

export async function auditCreate(guardianId, childId) {
    try {
        if (guardianId) {
            const auditEntryResponse = await client.models.Audit.create({
                auditId: uuidv4(),
                eventType: "CREATE",
                message: "Guardian created",
                guardianId: guardianId,
            });
        } else if (childId) {
            const auditEntryResponse = await client.models.Audit.create({
                auditId: uuidv4(),
                eventType: "CREATE",
                message: "Child created",
                childId: childId,
            });
        }
    } catch (error) {
      console.error("Error creating audit entry for CREATE:", error);
    }
  }

export async function playgroundEntry(childId) {
  try {
    const auditEntryResponse = await client.models.Audit.create({
      auditId: uuidv4(),
      eventType: "ENTRY",
      message: "Child entered playground",
      childId: childId,
    });
    console.log("Audit Entry Response:", auditEntryResponse);
  } catch (error) {
    console.error("Error creating audit entry for ENTRY:", error);
  }
}
