import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditError, auditCreate, auditDelete } from "./audit";
import { assignEmoji, getUnassignedEmojis } from "./emojiStore";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Registers a guardian and their children
 */
export async function register(guardian, children) {
  try {
    const guardianId = await createGuardian(guardian);

    const childrenAdded = [];

    for (const child of children) {
      const newChild = await createChild(
        guardianId,
        child
      );

      // If creation of current child failed, rollback
      if (newChild.errors)
        return rollback(guardianId, childrenAdded);

      childrenAdded.push(newChild);
    }

    const emojisAvailable = await getUnassignedEmojis(childrenAdded.length);

    for (let i = 0; i < childrenAdded.length; i++) {
      await assignEmoji(emojisAvailable[i], childrenAdded[i]);
    }

    return {
      successful: true,
      childrenAdded: childrenAdded,
      assignedEmojis: emojisAvailable
    };
  } catch (error) {
    return auditError("Error registering guardian: " + error);
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
    const { errors: createChildError, data: newChild } = childResponse;
    if (createChildError) throw new Error(createChildError[0].message);

    auditCreate(null, newChild?.childId);
    return childResponse.data.childId;
  } catch (error) {
    return auditError("Error creating child: " + error.message);
  }
}

async function deleteChild(childId) {
  try {
    const childResponse = await client.models.Child.delete({
      childId: childId,
    });

    const { errors: deleteChildError, data: deletedChild } = childResponse;
    if (deleteChildError) throw new Error(deleteChildError[0].message);

    auditDelete(null, deletedChild?.childId);
  } catch (error) {
    return auditError("Error deleting child: " + error.message);
  }
}

async function createGuardian(guardian) {
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

    const { errors: createGuardianError, data: newGuardian } = guardianResponse;
    if (createGuardianError) throw new Error(createGuardianError[0].message);

    auditCreate(newGuardian?.guardianId, null);
    return newGuardian?.guardianId;
  } catch (error) {
    return auditError("Error creating guardian: " + error.message);
  }
}

async function deleteGuardian(guardianId) {
  try {
    const childResponse = await client.models.Guardian.delete({
      guardianId: guardianId,
    });

    const { errors: deleteGuardianError, data: deletedGuardian } =
      childResponse;
    if (deleteGuardianError) throw new Error(deleteGuardianError[0].message);

    auditDelete(deletedGuardian?.guardianId);
  } catch (error) {
    return auditError("Error deleting guardian: " + error.message);
  }
}

async function rollback(guardianId, children) {
  try {
    for (const child of children) {
      if (child) {
        await deleteChild(child);
      }
    }
    await deleteGuardian(guardianId);
    return auditError(
      "Error during registration, rollback took place successfully."
    );
  } catch (error) {
    return auditError(
      "Error performing rollback, please contact an administrator! - " +
        error.message
    );
  }
}
