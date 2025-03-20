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
    const phoneNumber = guardian?.phoneNumber?.replace(/^0/, "+44");

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
      const newChild = await createChild(
        guardianResponse.data.guardianId,
        child
      );
      // TODO: Function needs added
      if (!newChild)
        throw new Error("😭 Need to rollback guardian! " + childrenAdded);

      childrenAdded.push(newChild);
    }
    console.log("All children added! " + childrenAdded);

    return { successful: true, childrenAdded: childrenAdded }

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
      freeSchoolMeals: child?.freeSchoolMeals,
      permissionToLeave: child?.permissionToLeave,
    });
    const { errors: childErrors, data: newChild } = childResponse;
    if (childErrors) throw new Error(childErrors[0].message);

    auditCreate(null, newChild?.childId);
    return childResponse.data.childId;
  } catch (error) {
    auditError("Error creating child: " + error.message);
    return null;
  }
}

async function deleteChild(childId) {
  try {
    const childResponse = await client.models.Child.delete({
      childId: childId,
    });

    const { errors: childErrors, data: newChild } = childResponse;
    if (childErrors) throw new Error(childErrors[0].message);

    auditCreate(null, newChild?.childId);
    return childResponse.data.childId;
  } catch (error) {
    auditError("Error creating child: " + error.message);
    return null;
  }
}

async function rollback(guardianId, children) {
  for (const child of children) {
    const deleteChild = await deleteChild(child.childId);
  }

  return null;
}
