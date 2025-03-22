import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  TextField,
  Heading,
  Flex,
  View,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { auditCreate } from "./apis/audit";
import { register } from "./apis/register";
import { enterPlayground, exitPlayground } from "./apis/playground";
import {
  getUnassignedEmojis,
  getChildId,
  seedEmojiStore,
  assignEmoji,
  unassignEmoji,
} from "./apis/emojiStore";



Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  async function handleSubmit(event) {
    const form = new FormData(event.target);
    event.preventDefault();
    // await createTestData(form);
    await register(null, null);
  }

  // Playground Test Functions
  async function handlePlaygroundEntry() {
    await enterPlayground("12341");
  }

  async function handlePlaygroundExit() {
    await exitPlayground("1234");
  }

  // Audit Test Functions
  async function handleAuditCreate() {
    await auditCreate("1234", null);
    await auditCreate(null, "5678");
  }

  // EmojiStore Test Functions
  async function handleSeedEmojiStore() {
    seedEmojiStore();
  }

  async function handleGetEmojis() {
    console.log(await getUnassignedEmojis(5));
  }

  async function handleCheckEmoji() {
    console.log(await getChildId("🍔🍕🍟"));
  }

  async function handleAssignEmoji() {
    try {
      const assign = await assignEmoji("🍔🍕🍟", "1234");
      console.log(assign);
    } catch (error) {
      console.error(error);
    }
    
  }

  async function handleUnassignEmoji() {
    try {
      const unassign = await unassignEmoji("🍔🍕🍟");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >
          <Heading level={1}>Craig's Tests</Heading>
          <View as="form" margin="3rem 0" onSubmit={handleSubmit}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                name="name"
                placeholder="Guardian Name"
                label="Guardian Name"
                labelHidden
                variation="quiet"
                required
              />
              <Button type="submit" variation="primary">
                Create Guardian, Child and Playground Entry
              </Button>
            </Flex>
          </View>
          <Divider/>

          <Heading level={2}>EmojiStore</Heading>
          <Button onClick={handleSeedEmojiStore} variation="link">
            SEED EMOJISTORE (only run once, creates 256 emojis)
          </Button>
          <Button onClick={handleGetEmojis} variation="link">
            GET UNASSIGNED EMOJI - 5 emojis printed to console
          </Button>
          <Button onClick={handleCheckEmoji} variation="link">
            CHECK EMOJI - 🍔🍕🍟
          </Button>
          <Button onClick={handleAssignEmoji} variation="link">
            ASSIGN EMOJI - 🍔🍕🍟 to "1234"
          </Button>
          <Button onClick={handleUnassignEmoji} variation="link">
            UNASSIGN EMOJI - 🍔🍕🍟 from "1234"
          </Button>
          <Divider/>

          <Heading level={2}>Playground</Heading>
          <Button onClick={handlePlaygroundEntry} variation="link">
            Playground ENTRY Test - childId = 1234
          </Button>
          <Button onClick={handlePlaygroundExit} variation="link">
            Playground EXIT Test - childId = 1234
          </Button>
          <Divider/>

          <Heading level={2}>Audit</Heading>
          <Button onClick={handleAuditCreate} variation="link">
            Audit CREATE Test - guardianId = 1234, childId = 5678
          </Button>

        </Flex>
      )}
    </Authenticator>
  );
}
