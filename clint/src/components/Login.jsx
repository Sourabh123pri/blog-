import React from "react";
import {NavLink, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {

 const navigate = useNavigate()

    const formik = useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: Yup.object({
        password: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
      }),
      onSubmit: (values) => {
       axios.post("/login", values).then((res)=>res).then((data)=>{
          if(data.data.message === "Log in Successful. " ){
            toast.success(data.data.message)       
            navigate("/")
          }
          else toast.warn(data.data.message)  
        }).catch((err)=>console.log(err));
      },
    });
  return (

    <div className="container ">
      <div className="row">
        <div className="col-8 col-md-6 col-sm-12 col-lg-8 ">
        </div>
    <div className="  col-sm-12 col-md-8 col-lg-6  bgColor my-5 rounded">
      <h1 className="font-weight-bold text-center pt-3">Log In </h1>
      <form onSubmit={formik.handleSubmit} className="py-5">
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input id="email"name="email"type="email"placeholder="Enter Email"className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.email}/>
          {formik.touched.email && formik.errors.email ? (<small className=" text-danger">{formik.errors.email}</small>) : null}
        </div>

        <div className="form-group">
          <label htmlFor="firstName">Password</label>
          <input id="password"name="password"type="password"placeholder="Enter Password "className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.password}/>
          {formik.touched.password && formik.errors.password ? (<small className="text-danger ">{formik.errors.password}</small>
          ) : null}
          </div>

       
       <div className="text-center">  
       <div className="btns">
       <button type="submit" className="btn btn-success">Log In</button>
       </div>
       <NavLink to="/singup"> I Don't Have Account. </NavLink> 
       </div>
        <ToastContainer theme="dark" position="top-center" />
      </form>
    </div>
    </div>
    </div>
  );
};
export default Login;
