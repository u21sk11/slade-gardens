import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditError, auditCreate } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Registers a guardian and their children
 */
export async function register(guardian, children) {
  try {
    console.log(JSON.stringify(guardian));
    console.log(JSON.stringify(children));

    console.log("!!! Creating Test Data !!!" + guardian);
    console.log("! Form Name: ", guardian?.firstName);

    const phoneNumber = guardian?.phoneNumber?.replace(/^0/, '+44');

    const guardianResponse = await client.models.Guardian.create({
      guardianId: uuidv4(),
      firstName: guardian?.firstName,
      lastName: guardian?.lastName,
      email: guardian?.email,
      addressLine1: guardian?.addressLine1,
      addressLine2: guardian?.addressLine2,
      city: guardian?.city,
      postcode: guardian?.postcode,
      phoneNumber: phoneNumber,
      permissionMedia: guardian?.permissions.photos,
      permissionContact: guardian?.permissions.emails,
      referralSource: guardian?.referralSource,
    });
    const { errors: guardianCreateError, data: newGuardian } = guardianResponse;
    if (guardianCreateError) throw new Error(guardianCreateError[0].message);
    auditCreate(newGuardian?.guardianId, null);

    const childrenAdded = [];

    for (const child of children) {
      const newChild = await createChild(guardianResponse.data.guardianId, child);
      if (!newChild) throw new Error("😭 Need to rollback guardian! " + childrenAdded);

      auditCreate(null, newChild);
      childrenAdded.push(newChild);
    }
    console.log("All children added! " + childrenAdded);
  } catch (error) {
    auditError("Error registering guardian: " + error);
  }
}

async function createChild(guardianId, child) {
  try {
    const childResponse = await client.models.Child.create({
      childId: uuidv4(),
      guardianId: guardianId,
      firstName: child?.firstName,
      lastName: child?.lastName,
      gender: child?.gender,

      ethnicity: child?.ethnicity,
      dob: child?.dob,
      school: child?.school,
      allergies: child?.allergies,
      disabilities: child?.disabilities,
      // TODO: THESE NEED ADDED TO FRONT END!
      freeSchoolMeals: false,
      permissionToLeave: false,
    });

    const { errors: childErrors, data: newChild } = childResponse;
    if (childErrors) throw new Error(childErrors[0].message);
    auditCreate(null, newChild?.childId);
    return childResponse.data.childId;
  } catch (error) {
    auditError("Error creating child: " + error.message);
    return null
  }
}
