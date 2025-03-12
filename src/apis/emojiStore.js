import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import {
  auditEmojiAssignment,
  auditEmojiUnassignment,
  auditError,
} from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

/**
 * Gets a specified amount of unassigned emojis
 */
export async function getUnassignedEmojis(emojiCount) {
  try {
    let nextToken = null;
    let usabbleEmojis = [];

    do {
      const [unassignedEmojis, newNextToken] = await fetchEmojis(nextToken);
      if (unassignedEmojis.length > 0) {
        for (const emoji of unassignedEmojis) {
          usabbleEmojis.push(emoji.emoji);
          if (usabbleEmojis.length == emojiCount) return usabbleEmojis;
        }
      }
      nextToken = newNextToken;
    } while (nextToken);
    auditError("Not enough unassigned emojis found for allocation.");
  } catch (error) {
    auditError(
      "Unknown error whilst getting unassigned emojis: ${error.message}"
    );
  }
}

/**
 * Helper function to fetch emojis
 */
async function fetchEmojis(nextToken) {
  try {
    const emojiStore = await client.models.EmojiStore.list({
      filter: {
        childId: {
          eq: "none",
        },
      },
      limit: 3,
      nextToken: nextToken,
    });

    const { errors: responseError, nextToken: newNextToken } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    return [emojiStore.data, newNextToken];
  } catch (error) {
    auditError("Unknown error whilst fetching emojis: ${error.message}");
  }
}

/**
 * Assigns an emoji to a child
 */
export async function assignEmoji(emoji, childId) {
  try {
    const childIdCheck = await getChildId(emoji);
    if (childIdCheck !== "none") {
      auditError(emoji + " already assigned to another child", null, childId);
      return;
    }

    const emojiStore = await client.models.EmojiStore.update({
      emoji: emoji,
      childId: childId,
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);
    auditEmojiAssignment(emoji, childId);
  } catch (error) {
    auditError("Unknown error whilst assigning emoji: ${error.message}", null, childId);
  }
}

/**
 * Unassigns an emoji from a child
 */
export async function unassignEmoji(emoji) {
  try {
    const childId = await getChildId(emoji);
    if (childId === "none") {
      auditError(emoji + " is not assigned to a child, could not unassign");
      return;
    }

    const emojiStore = await client.models.EmojiStore.update({
      emoji: emoji,
      childId: "none",
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);
    auditEmojiUnassignment(emoji, childId);
  } catch (error) {
    auditError("Unknown error whilst unassigning emoji: ${error.message}");
  }
}

/**
 * Get the child ID assigned to an emoji
 */
export async function getChildId(emoji) {
  try {
    const emojiStore = await client.models.EmojiStore.get({
      emoji: emoji,
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);
    return emojiStore.data.childId;
  } catch (error) {
    auditError("Unknown error whilst getting child ID: ${error.message}");
  }
}

/**
 * Seed the emoji store with predefined emojis (Should only be used once and by an admin) m
 */
export async function seedEmojiStore() {
  try {
    const emojiStore = await client.models.EmojiStore.list();
    if (emojiStore.data.length > 0) {
      auditError("Emoji store already seeded or not empty");
      return;
    }
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    // Temporary emojis to seed the emoji store
    const predefinedEmojis = ["🍕", "🍔", "🍟", "🍇"];

    const permutations = [];
    for (const emoji1 of predefinedEmojis) {
      for (const emoji2 of predefinedEmojis) {
        for (const emoji3 of predefinedEmojis) {
          permutations.push(emoji1 + emoji2 + emoji3);
        }
      }
    }

    // Shuffle to randomize the order of the emojis
    for (let i = permutations.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [permutations[i], permutations[j]] = [permutations[j], permutations[i]];
    }

    await Promise.all(
      permutations.map(async (emoji) => {
        const emojiEntry = {
          emoji: emoji,
          childId: "none",
        };
        const emojiStore = await client.models.EmojiStore.create(emojiEntry);
        const { errors: emojiErrors } = emojiStore;
        if (emojiErrors) throw new Error(emojiErrors[0].message);
      })
    );
  } catch (error) {
    auditError("Error seeding emoji store: " + error);
  }
}
