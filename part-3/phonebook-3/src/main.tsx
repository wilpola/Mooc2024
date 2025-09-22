import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
// import Redirect from "./lib/Redirect.tsx";
import About from "./About.tsx";

createRoot(document.getElementById("root")!).render(
  <Router>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
      </Route>
      {/* <Route path="/" element={<Redirect />} /> */}
    </Routes>
  </Router>
);
