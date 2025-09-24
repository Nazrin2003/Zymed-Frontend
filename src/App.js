import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import CHome from "./components/CHome";
import Phome from "./components/Phome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<CHome />} />
        <Route path="/phome" element={<Phome />} />
        <Route path="/med" element={<Medicine}
      </Routes>
    </Router>
  );
}

export default App;
