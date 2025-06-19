import React from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// import views
import { Home } from "./views";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
