import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import CHome from "./components/CHome";
import Phome from "./components/Phome";
import Medicine from "./components/Medicine";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Cprescription from "./components/Cprescription";
import Pprescription from "./components/Pprescription";
import PrescriptionVerify from "./components/PrescriptionVerify";
import POrder from "./components/POrder";
import Notification from "./components/Notification";
import Subscribe from "./components/Subscribe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Signin />} />
        <Route path="/home" element={<CHome />} />
        <Route path="/med" element={<Medicine/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/cprescription" element={<Cprescription/>}/>
        <Route path="/subscribe" element={<Subscribe/>}/>

        <Route path="/phome" element={<Phome />} />
        <Route path="/porder" element={<POrder />} />
        <Route path="/pprescription" element={<Pprescription />} />
        <Route path="/verify-prescription/:id" element={<PrescriptionVerify />} />
        <Route path="/notification" element={<Notification />} />

      </Routes>
    </Router>
  );
}

export default App;
