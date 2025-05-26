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

export async function getChildren(guardianId) {
  try {
    const children = await client.models.Child.list({
      filter: {
        guardianId: {
          eq: guardianId,
        },
      },
    });

    // Get the emoji data from the emoji store
    for (const child of children.data) {
      const emoji = await client.models.AssignedEmojis.list({
      filter: {
        childId: { eq: child.childId },
      },
    })
      child.emoji = emoji.data[0].emoji; // Assuming emoji is a field in the EmojiStore model
    }

    // Process the children data to extract relevant information, firstName and childId
    const childrenData = children.data.map((child) => ({
      firstName: child.firstName,
      emoji: child.emoji,
    }));

    return childrenData;
  } catch (error) {
    auditError("Error fetching children for guardian: " + error);
    throw error;
  }
}
