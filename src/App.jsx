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
import { auditCreate } from "./apis/audit";
import { enterPlayground, exitPlayground } from "./apis/playground";
import { getUnassignedEmojis, getChildId, seedEmojiStore } from "./apis/emojiStore";

import { Routes, Route } from 'react-router-dom';
import PrivacyPolicy from "./app/pages/PrivacyPolicy";
import About from './app/pages/About';
import Contact from "./app/pages/Contact";
import Registration from "./app/pages/Registration";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);

export default function App() {

  return (
             <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#6EB545" }}>
             <Navbar />

            
            <div className="flex-grow">
              <Routes>
                <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/register" element={<Registration />}/>
              </Routes>
            </div>

            
           
    <Footer className="flex-shrink-0" />
    </div>
  );
}
