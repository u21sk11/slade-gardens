import { v4 as uuidv4 } from "uuid";
import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Creates an audit entry.
 */
async function createAuditEntry(eventType, message, guardianId, childId) {
  try {
    const auditEntry = {
      auditId: uuidv4(),
      eventType: eventType,
      message: message,
    };
    if (guardianId) {
      auditEntry.guardianId = guardianId;
    }
    if (childId) {
      auditEntry.childId = childId;
    }
    const auditEntryResponse = await client.models.Audit.create(auditEntry);
    const { errors: responseError } = auditEntryResponse;
    if (responseError) throw new Error(responseError[0].message);
  } catch (error) {
    console.error(
      "Unknown error whilst creating audit for ${eventType}: ${error.message}"
    );
  }
}

/**
 * Audits an error event.
 */
export async function auditError(message, guardianId, childId) {
  console.error(message);
  await createAuditEntry("ERROR", message, guardianId, childId);
}

/**
 * Audits a create event.
 */
export async function auditCreate(guardianId, childId) {
  await createAuditEntry(
    "CREATE",
    guardianId ? "Guardian created" : "Child created",
    guardianId,
    childId
  );
}

/**
 * Audits a delete event.
 */
export async function auditDelete(guardianId, childId) {
  await createAuditEntry(
    "DELETE",
    guardianId ? "Guardian deleted" : "Child deleted",
    guardianId,
    childId
  );
}

/**
 * Audits an update event.
 */
export async function auditUpdate(guardianId, childId) {
  await createAuditEntry(
    "UPDATE",
    guardianId ? "Guardian updated" : "Child updated",
    guardianId,
    childId
  );
}

/**
 * Audits a read event, whenever the full guardian or child data is requested.
 */
export async function auditRead(guardianId, childId) {
  await createAuditEntry(
    "READ",
    guardianId ? "Guardian read" : "Child read",
    guardianId,
    childId
  );
}

/**
 * Audits a playground entry event.
 */
export async function aduitPlaygroundEntry(childId) {
  await createAuditEntry("ENTRY", "Child entered playground", null, childId);
}

/**
 * Audits a playground exit event.
 */
export async function auditPlaygroundExit(childId) {
  await createAuditEntry("EXIT", "Child exited playground", null, childId);
}

/**
 * Audits an emoji assignment event.
 */
export async function auditEmojiAssignment(emoji, childId) {
  await createAuditEntry(
    "EMOJISTORE",
    `${emoji} assigned`,
    null,
    childId
  );
}

/**
 * Audits an emoji unassignment event.
 */
export async function auditEmojiUnassignment(emoji, childId) {
  await createAuditEntry(
    "EMOJISTORE",
    `${emoji} unassigned`,
    null,
    childId
  );
}
