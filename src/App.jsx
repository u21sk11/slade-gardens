import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import { Routes, Route } from "react-router-dom";
import UpdatedRegistration from "./components/registration/Registration";
import Home from "./app/pages/Home";
import Confirmation from "./app/pages/Confirmation";

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

Amplify.configure(outputs);

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UpdatedRegistration />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </div>
    </div>
  );
}
