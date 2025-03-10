import { generateClient } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditError } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

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
    console.error(
      `Unknown error whilst getting unassigned emojis: ${error.message}`
    );
  }
}

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
    console.error(
      `Unknown error whilst fetching emojis: ${error.message}`
    );
  }
}

export async function getChildId(emoji) {
  try {
    const emojiStore = await client.models.EmojiStore.get({
      emoji: emoji,
    });
    const { errors: responseError } = emojiStore;
    if (responseError) throw new Error(responseError[0].message);

    console.log("emojiStore: " + JSON.stringify(emojiStore));
    console.log("emojiStore childId: " + emojiStore.data.childId);

    return emojiStore.data.childId;
  } catch (error) {
    console.error(`Unknown error whilst getting child ID: ${error.message}`);
  }
}

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
        const emojiStore = await client.models.EmojiStore.create(
          emojiEntry
        );
        const { errors: emojiErrors } = emojiStore;
        if (emojiErrors) throw new Error(emojiErrors[0].message);
      })
    );
  } catch (error) {
    auditError("Error seeding emoji store: " + error);
  }
}
