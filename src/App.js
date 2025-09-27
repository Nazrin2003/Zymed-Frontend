import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import CHome from "./components/CHome";
import Phome from "./components/Phome";
import Medicine from "./components/Medicine";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<CHome />} />
        <Route path="/phome" element={<Phome />} />
        <Route path="/med" element={<Medicine/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </Router>
  );
}

export default App;
