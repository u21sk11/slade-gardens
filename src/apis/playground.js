import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { aduitPlaygroundEntry, auditError, auditPlaygroundExit } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function enterPlayground(childId) {
  try {
    const playgroundCheck = await client.models.Playground.get({
      childId: childId,
    });
    if (playgroundCheck.data !== null) {
      auditError("Child is already in the playground");
      return;
    }

    const playgroundEntryResponse = await client.models.Playground.create({
      childId: childId,
    });
    aduitPlaygroundEntry(childId);
  } catch (error) {
    auditError("Error entering playground: " + error);
  }
}

export async function exitPlayground(childId) {
  try {
    const playgroundCheck = await client.models.Playground.get({
      childId: childId,
    });
    if (playgroundCheck.data === null) {
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
