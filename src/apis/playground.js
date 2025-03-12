import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { aduitPlaygroundEntry, auditError, auditPlaygroundExit } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Add a child to the playground
 */
export async function enterPlayground(childId) {
  try {
    const childInPlayground = await inPlayground(childId);
    if (childInPlayground) {
      auditError("Child is already in the playground", null, childId);
      return;
    }

    const playgroundEntryResponse = await client.models.Playground.create({
      childId: childId,
    });
    const { errors: createError } = playgroundEntryResponse;
    if (createError) throw new Error(createError[0].message);

    aduitPlaygroundEntry(childId);
  } catch (error) {
    auditError("Error entering playground: " + error);
  }
}

/**
 * Remove a child from the playground
 */
export async function exitPlayground(childId) {
  try {
    const childInPlayground = await inPlayground(childId);
    if (!childInPlayground) {
      auditError("Child is not in the playground");
      return;
    }

    await client.models.Playground.delete({
      childId: childId,
    });
    auditPlaygroundExit(childId);
  } catch (error) {
    auditError("Error exiting playground: " + error);
  }
}

/**
 * Helper function to check if a child is in the playground, returns a boolean
 */
async function inPlayground(childId) {
  const playgroundCheck = await client.models.Playground.get({
    childId: childId,
  });
  const { errors: responseError } = playgroundCheck;
  if (responseError) throw new Error(responseError[0].message);
  return playgroundCheck.data !== null;
}
