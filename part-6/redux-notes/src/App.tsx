// Main application file
import { Routes, Route } from "react-router-dom";

// Import views
import { Landing } from "./views";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}


function NotFound() {
  return <div>404 - Not Found</div>;
}

export default App;
