import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import Redirect from "./lib/Redirect.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route element={<Layout />} >
        <Route path="/part-3/phonebook" element={<App />} />
        <Route path="*" element={<Redirect />} />
      </Route>
    </Routes>
  </Router>
);
