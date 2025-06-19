import React from "react";

import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";


const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl font-bold">Welcome to the Countries App</h1>
            </div>
          }
        />
        {/* Add more routes here as needed */}
      </Route>
      </Routes>
    </>
  );
};

export default App;
