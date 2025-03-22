import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

import { Routes, Route } from 'react-router-dom';
import PrivacyPolicy from "./app/pages/PrivacyPolicy";
import About from './app/pages/About';
import Contact from "./app/pages/Contact";
import Registration from "./app/pages/Registration";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./app/pages/admin/Admin";
import GuardianSignin from "./app/pages/admin/GuardianSignin";
import Home from "./app/pages/Home";
import VolunteerSignin from "./app/pages/admin/VolunteerSignin";

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
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/guardian-signin" element={<GuardianSignin />} />
                <Route path="/admin/volunteer" element={<VolunteerSignin />} />
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
