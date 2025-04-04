import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";

import { Routes, Route } from "react-router-dom";
import PrivacyPolicy from "./app/pages/PrivacyPolicy";
import About from "./app/pages/About";
import Contact from "./app/pages/Contact";
import Registration from "./app/pages/Registration";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Admin from "./app/pages/admin/Admin";
import GuardianSignin from "./app/pages/admin/GuardianSignin";
import Home from "./app/pages/Home";
import VolunteerSignin from "./app/pages/admin/VolunteerSignin";
import VisitorSignin from "./app/pages/admin/VisitorSignin";
import YoungPerson from "./app/pages/admin/YoungPerson";
import YoungPersonConfirm from "./app/pages/admin/YoungPersonConfirm";
import ManagementPage from "./app/pages/admin/Management";
import RollCall from "./app/pages/admin/RollCall";
import Confirmation from "./app/pages/Confirmation";
import YoungPersonLogin from "./app/pages/admin/YoungPersonLogin";
import YoungPersonLogout from "./app/pages/admin/YoungPersonLogout";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/guardian" element={<GuardianSignin />} />
          <Route path="/admin/young-person" element={<YoungPerson />} />
          <Route
            path="/admin/young-person-confirm"
            element={<YoungPersonConfirm />}
          />
          <Route
            path="/admin/young-person/login"
            element={<YoungPersonLogin />}
          />
          <Route
            path="/admin/young-person/logout"
            element={<YoungPersonLogout />}
          />
          <Route path="/admin/volunteer" element={<VolunteerSignin />} />
          <Route path="/admin/visitor" element={<VisitorSignin />} />
          <Route path="/admin/management" element={<ManagementPage />} />
          <Route path="/admin/roll-call" element={<RollCall />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
      <Footer className="flex-shrink-0" />
    </div>
  );
}
