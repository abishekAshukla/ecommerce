import { useState } from "react";
import Navbar from "./Components/UI/Navbar";
import Home from "./Components/Home page/Home";
import Login from "./Components/Login Page/Login";
import OtpScreen from "./Components/UI/OtpScreen";
import Loader2 from "./Components/UI/Loader2";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="">
      <Router>
        <Loader2/>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/otp" element={<OtpScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
