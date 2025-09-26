// Main Application file
import { Routes, Route } from "react-router-dom";

// Import pages
import { About, Home, CreateAnecdote } from "./views";
import Layout from "./components/layout";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/anecdotes/:id" element={<></>} />
        <Route path="/create" element={<CreateAnecdote />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
