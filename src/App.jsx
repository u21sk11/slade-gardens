import { useState, useEffect } from "react";
import {
  Authenticator,
  Button,
  Text,
  TextField,
  Heading,
  Flex,
  View,
  Image,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { getUrl } from "aws-amplify/storage";
import { uploadData } from "aws-amplify/storage";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { createTestData } from "./api";
import { auditCreate } from "./apis/audit";
import { enterPlayground, exitPlayground } from "./apis/playground";
import { getUnassignedEmojis, getChildId, seedEmojiStore } from "./apis/emojiStore";

import { Routes, Route } from 'react-router-dom';
import About from './app/pages/About';

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const { data: notes } = await client.models.Note.list();
    await Promise.all(
      notes.map(async (note) => {
        if (note.image) {
          const linkToStorageFile = await getUrl({
            path: ({ identityId }) => `media/${identityId}/${note.image}`,
          });
          console.log(linkToStorageFile.url);
          note.image = linkToStorageFile.url;
        }
        return note;
      })
    );
    console.log(notes);
    setNotes(notes);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    console.log(form.get("image").name);

    const { data: newNote } = await client.models.Note.create({
      name: form.get("name"),
      description: form.get("description"),
      image: form.get("image").name,
    });

    console.log(newNote);
    if (newNote.image)
      if (newNote.image)
        await uploadData({
          path: ({ identityId }) => `media/${identityId}/${newNote.image}`,

          data: form.get("image"),
        }).result;

    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const toBeDeletedNote = {
      id: id,
    };

    const { data: deletedNote } = await client.models.Note.delete(
      toBeDeletedNote
    );
    console.log(deletedNote);

    fetchNotes();
  }

  async function handleSubmit(event) {
    const form = new FormData(event.target);
    event.preventDefault();
    await createTestData(form);
  }

  async function handlePlaygroundEntry() {
    await enterPlayground("1234");
  }

  async function handlePlaygroundExit() {
    await exitPlayground("1234");
  }

  async function handleAuditCreate() {
    await auditCreate("1234", "5678");
    await auditCreate(null, "5678");
    await auditCreate("1234", "5678");
  }
  
  async function handleSeedEmojiStore() {
    seedEmojiStore();
  }
  
  async function handleAssignEmoji() {
    getUnassignedEmojis(5);
  }
  
  async function handleCheckEmoji() {
    getChildId("🍔🍕🍟");
  }

  return (
    <>
    <Routes>
      <Route path="/about" element={<About />}/>
    </Routes>
    {/* <Authenticator>
      {({ signOut }) => (
        <Flex
          className="App"
          justifyContent="center"
          alignItems="center"
          direction="column"
          width="70%"
          margin="0 auto"
        >
          
          <Heading level={1}>My Notes App</Heading>
          <View as="form" margin="3rem 0" onSubmit={handleSubmit}>
            <Flex
              direction="column"
              justifyContent="center"
              gap="2rem"
              padding="2rem"
            >
              <TextField
                name="name"
                placeholder="Note Name"
                label="Note Name"
                labelHidden
                variation="quiet"
                required
              />
              <TextField
                name="description"
                placeholder="Note Description"
                label="Note Description"
                labelHidden
                variation="quiet"
                required
              />
              <Button type="submit" variation="primary">
                Create Note
              </Button>
            </Flex>
          </View>
          <Divider />
          <Heading level={2}>Current Notes</Heading>
          <Grid
            margin="3rem 0"
            autoFlow="column"
            justifyContent="center"
            gap="2rem"
            alignContent="center"
          >
            {notes.map((note) => (
              <Flex
                key={note.id || note.name}
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap="2rem"
                border="1px solid #ccc"
                padding="2rem"
                borderRadius="5%"
                className="box"
              >
                <View>
                  <Heading level="3">{note.name}</Heading>
                </View>
                <Text fontStyle="italic">{note.description}</Text>
                {note.image && (
                  <Image
                    src={note.image}
                    alt={`visual aid for ${notes.name}`}
                    style={{ width: 400 }}
                  />
                )}
                <Button
                  variation="destructive"
                  onClick={() => deleteNote(note)}
                >
                  Delete note
                </Button>
              </Flex>
            ))}
          </Grid>
          <Button onClick={handlePlaygroundEntry} variation="link">
            Playground ENTRY Test
          </Button>
          <Button onClick={handlePlaygroundExit} variation="link">
            Playground EXIT Test
          </Button>
          <Button onClick={handleAuditCreate} variation="link">
            Audit CREATE Test
          </Button>
          <Button onClick={handleSeedEmojiStore} variation="destructive">
            SEED EMOJISTORE
          </Button>
          <Button onClick={handleAssignEmoji} variation="warning">
            ASSIGN EMOJI
          </Button>
          <Button onClick={handleCheckEmoji} variation="warning">
            CHECK EMOJI
          </Button>
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      )}
    </Authenticator> */}
    </>
  );
}
