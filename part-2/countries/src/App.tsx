import React from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// import views
import { About, Home } from "./views";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
