import React, { useState } from "react";
import axios from "axios"
// import "../styles/login.css"

const Signin = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3030/signin", formData);
      if (res.data.status === "Success") {
        alert("Welcome " + res.data.user.name);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/home";   // redirect after login
      } else {
        alert(res.data.status);
      }
    } catch (err) {
      console.error(err);
      alert("Signin failed");
    }
  };
  return (
    <div>
        <div className="container mt-5 p-4 border rounded shadow signin-container">
      <h2 className="text-center mb-4">Zymed - Signin</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-3" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="btn btn-success w-100">Sign In</button>
      </form>
    </div>
    </div>
  )
}

export default Signin