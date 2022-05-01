import React from "react";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="notfound">
        <NavLink to={"/"}> Back to Home </NavLink>
      </div>
    </>
  );
};

export default NotFound;
