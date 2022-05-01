import React from 'react'
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Singup from "./components/Singup";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import UpdateProfile from './components/UpdateProfile';
import ChangePassword from './components/ChangPassword';

const App = () => {


  return (
    <>
    <Navbar  />
       <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/singup" element={<Singup />} />
        <Route exact path="/updateprofile" element={<UpdateProfile />} />
        <Route exact path="/changepassword" element={<ChangePassword />} />
        <Route  path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
};
export default App;
