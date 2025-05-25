import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditPlaygroundEntry, auditError, auditPlaygroundExit } from "./audit";
import { increaseChildrenCount } from "./statistics";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Add a child to the playground
 */
export async function enterPlayground(childId, fullName) {
  try {
    const childInPlayground = await inPlayground(childId);
    if (childInPlayground)
      throw new Error("Child is already in the playground");

    const playgroundEntryResponse = await client.models.Playground.create({
      childId: childId,
      fullName: fullName,
    });
    const { errors: responseError } = playgroundEntryResponse;
    if (responseError) throw new Error(responseError[0].message);

    increaseChildrenCount();
    auditPlaygroundEntry(childId);
  } catch (error) {
    auditError("Error entering playground: " + error, null, childId);
  }
}

/**
 * Remove a child from the playground
 */
export async function exitPlayground(childId) {
  try {
    const childInPlayground = await inPlayground(childId);
    if (!childInPlayground) throw new Error("Child is not in the playground");

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
export async function inPlayground(childId) {
  try {
    const playgroundCheck = await client.models.Playground.get({
      childId: childId,
    });
    const { errors: responseError } = playgroundCheck;
    if (responseError) throw new Error(responseError[0].message);
    return playgroundCheck.data !== null;
  } catch (error) {
    auditError("Error checking if child is in playground: " + error);
  }
}

/**
 * Get a count of all children in the playground
 */
export async function headcount() {
  try {
    const totalChildren = await rollCall();
    return totalChildren.length;
  } catch (error) {
    auditError("Error getting headcount: " + error);
  }
}

/**
 * Get all children in the playground
 */
export async function rollCall() {
  try {
    const playgroundEntries = await client.models.Playground.list();
    const { errors: responseError } = playgroundEntries;
    if (responseError) throw new Error(responseError[0].message);
    return playgroundEntries.data;
  } catch (error) {
    auditError("Error getting roll call: " + error);
  }
}
