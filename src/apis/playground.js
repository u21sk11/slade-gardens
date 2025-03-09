import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { aduitPlaygroundEntry, auditError, auditPlaygroundExit } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function enterPlayground(childId){
    try {
        const playgroundEntryResponse = await client.models.Playground.create({
            childId: childId,
        });
        aduitPlaygroundEntry(childId);
    } catch (error) {
        auditError("Error entering playground: " + error);
        throw new Error("Error entering playground: " + error);
    }
}

export async function exitPlayground(childId){
    try {
        const playgroundEntryResponse = await client.models.Playground.delete({
            childId: childId,
        });
        // console.log("Child entered playground:", playgroundEntryResponse);
        auditPlaygroundExit(childId);
    } catch (error) {
        console.error("Error entering playground:", error);
    }
}