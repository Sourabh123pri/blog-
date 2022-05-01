import React from 'react'
import axios from 'axios'
import {NavLink} from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
const Navbar = () => {

  const logOut = async ()=>{
    const res = await axios.get('/logout');
    if(res.data.message === " logout "){
      toast.success(res.data.message)
    }
  }

 
  return (
    <>
    <div className="navBar">
    <ToastContainer theme="dark" position="top-center" />
    <nav className="navbar navbar-expand-lg navbar-light navBgColor">
   <NavLink className="navbar-brand" to="/">Public</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  <ul className="navbar-nav ml-auto">
      <li className="nav-item ">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link"  to="/about">About</NavLink>
      </li>
        <li className="nav-item">
       <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
        <li className="nav-item">
        <NavLink className="nav-link text-muted" onClick={logOut} to="">Log out</NavLink>
      </li>
    </ul>
  </div>
</nav>
    </div>
    </>
  )
}

export default Navbar