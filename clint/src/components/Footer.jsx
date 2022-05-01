import React from 'react'
import { NavLink } from 'react-router-dom'
import "../App.css"
const Footer = () => {
  return (
    <>
    <div className="footer">
    <footer className="container">
        <p className="float-right"><NavLink to="/">Back to top</NavLink></p>
        <p>&copy;{2022} Company, Inc. &middot; <NavLink to="/">Privacy</NavLink> &middot; <NavLink to="/">Terms</NavLink></p>
      </footer> 
    </div>
    </>
  )
}

export default Footer