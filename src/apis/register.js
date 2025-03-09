import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export async function registerGuardian(newGuardian){
    
}