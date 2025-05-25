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
      limit: 10,
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
export async function assignEmoji(emoji, childId, firstName, lastName) {
  try {
    // Check if emoji is already assigned to a child
    const childIdCheck = await getChildFromEmoji(emoji);
    if (childIdCheck !== "notAssigned")
      throw new Error(emoji + " already assigned to another child");

    // Assign emoji to child
    const assignedEmojis = await client.models.AssignedEmojis.create({
      emoji: emoji,
      childId: childId,
      firstName: firstName,
      lastName: lastName,
    });
    const { errors: createError } = assignedEmojis;
    if (createError) throw new Error(createError[0].message);

    // Remove from EmojiStore
    const emojiStore = await client.models.EmojiStore.delete({
      emoji: emoji,
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
    // Check if emoji is assigned to a child
    const childIdCheck = await getChildFromEmoji(emoji);
    if (childIdCheck === "notAssigned")
      throw new Error(emoji + " is not assigned to a child");

    // Add to EmojiStore
    const emojiStore = await client.models.EmojiStore.create({
      emoji: emoji,
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    // Remove from AssignedEmojis
    const assignedEmojis = await client.models.AssignedEmojis.delete({
      emoji: emoji,
    });
    const { errors: deleteError } = assignedEmojis;
    if (deleteError) throw new Error(deleteError[0].message);

    auditEmojiUnassigned(emoji, childIdCheck.childId);
  } catch (error) {
    auditError("Error unassigning emoji: " + error.message);
  }
}

/**
 * Get the child ID assigned to an emoji
 */
export async function getChildFromEmoji(emoji) {
  try {
    const emojiStore = await client.models.AssignedEmojis.get({
      emoji: emoji,
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    if (!emojiStore.data) return "notAssigned";

    return emojiStore.data;
  } catch (error) {
    auditError("Error getting childId for an emoji: " + error.message);
  }
}

/**
 * Search for a child by name
 */
export async function nameSearch(firstName, lastName) {
  try {

    let fullSearch = false;

    if (!firstName)
      firstName = " ";
    else if (!lastName)
      lastName = " ";
    else {
      fullSearch = true;
    }

    let search;
    if (fullSearch){
      search = await client.models.AssignedEmojis.list({
      filter: {
        and: [
          { firstName: { beginsWith: firstName } },
          { lastName: { beginsWith: lastName } },
        ]
      },
    });
    } else {
      search = await client.models.AssignedEmojis.list({
        filter: {
          or: [
            { firstName: { beginsWith: firstName } },
            { lastName: { beginsWith: lastName } },
          ]
        },
      });
    }
    const { errors: responseError } = search;
    if (responseError) throw new Error(responseError[0].message);

    return search.data;
  } catch (error) {
    auditError("Error searching for child: " + error.message);
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
        };
        const emojiStore = await client.models.EmojiStore.create(emojiEntry);
        const { errors: responseError } = emojiStore;
        if (responseError) throw new Error(responseError[0].message);
      })
      );
      console.log("Seeded " + (i + batch.length) + " emojis");
    }
    console.log("Emoji store seeded successfully");
  } catch (error) {
    auditError("Error seeding emoji store: " + error.message);
  }
}
