import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import {
  auditEmojiAssignment,
  auditEmojiUnassigned,
  auditError,
} from "./audit";
import emojiData from '../data/emojis.json';

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
    let usableEmojis = [];

    do {
      const [unassignedEmojis, newNextToken] = await fetchEmojis(nextToken);
      if (unassignedEmojis.length > 0) {
        for (const emoji of unassignedEmojis) {
          usableEmojis.push(emoji.emoji);
          if (usableEmojis.length == emojiCount) return usableEmojis;
        }
      }
      nextToken = newNextToken;
    } while (nextToken);

    auditError("Not enough unassigned emojis found for allocation");
  } catch (error) {
    auditError("Error getting unassigned emojis: " + error.message);
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
    auditError("Error fetching emojis: " + error.message);
  }
}

/**
 * Assigns an emoji to a child
 */
export async function assignEmoji(emoji, childId) {
  try {
    const childIdCheck = await getChildId(emoji);
    if (childIdCheck !== "none")
      throw new Error(emoji + " already assigned to another child");

    const emojiStore = await client.models.EmojiStore.update({
      emoji: emoji,
      childId: childId,
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    auditEmojiAssignment(emoji, childId);
  } catch (error) {
    return auditError("Error assigning emoji: " + error.message, null, childId);
  }
}

/**
 * Unassign an emoji from a child
 */
export async function unassignEmoji(emoji) {
  try {
    const childId = await getChildId(emoji);
    if (childId === "none")
      throw new Error(emoji + " is not assigned to a child");

    const emojiStore = await client.models.EmojiStore.update({
      emoji: emoji,
      childId: "none",
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    auditEmojiUnassigned(emoji, childId);
  } catch (error) {
    auditError("Error unassigning emoji: " + error.message);
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
    auditError("Error getting childId for an emoji: " + error.message);
  }
}

/**
 * Seed the emoji store with predefined emojis (Should only be used once and by an admin) m
 */
export async function seedEmojiStore() {
  try {
    const emojiStore = await client.models.EmojiStore.list();
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);
    if (emojiStore.data.length > 0)
      throw new Error("Emoji store already seeded or not empty");

    const predefinedEmojis = Object.keys(emojiData);

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

    const BATCH_SIZE = 100; // Number of emojis to process at once
    
    for (let i = 0; i < permutations.length; i += BATCH_SIZE) {
      const batch = permutations.slice(i, i + BATCH_SIZE);
      await Promise.all(
      batch.map(async (emoji) => {
        const emojiEntry = {
        emoji: emoji,
        childId: "none",
        };
        const emojiStore = await client.models.EmojiStore.create(emojiEntry);
        const { errors: responseError } = emojiStore;
        if (responseError) throw new Error(responseError[0].message);
      })
      );
      console.log("Seeded " + (i + batch.length) + " emojis");
    }
  } catch (error) {
    auditError("Error seeding emoji store: " + error.message);
  }
}
