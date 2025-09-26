import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <Router>
    {/* Notify user for 5 seconds */}
    <Toaster position={"top-center"} duration={5000} richColors/>
    <Routes>
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);
