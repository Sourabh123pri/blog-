import React from "react";
import { ToastContainer, toast } from "react-toastify";
import {NavLink,useNavigate} from "react-router-dom"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";


const Singup = () => {
const navigate = useNavigate()

    const formik = useFormik({
      initialValues: {name:"", email: "" ,phone:"", password: "",cpassword:"" },
      validationSchema: Yup.object({
        name: Yup.string().min(3,"Must be 3 characers less").max(15, "Must be 15 characters or gratear").required(),
        email: Yup.string().email("Invalid email address").required(),
        phone: Yup.number().moreThan(10,"Only 10 digits more then").required(),
        password: Yup.string().min(6,"must be 6 characters less").max(15, "Must be 15 characters or gratear").required(),
        cpassword: Yup.string().required().oneOf([Yup.ref("password"),null],"Dosent match "),
      }),
      onSubmit: (values) => {
            axios.post("/register", values).then((res)=>res).then((data)=>{
           toast.success(data.data.message);
           navigate("/login")
        }).catch((err)=>console.log(err));
      },
    });
  return (
    <>
      <div className="container bgColor my-5 rounded  ">
      <h1 className="font-weight-bold text-center pt-3">Sing Up </h1>
      <form onSubmit={formik.handleSubmit} className="py-5">
        
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input id="name"name="name"type="name"placeholder="Enter name" className="text-capitalize form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.name}/>
          {formik.touched.name && formik.errors.name ? (<small className=" text-danger">{formik.errors.name}</small>) : null}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email </label>
          <input id="email"name="email"type="email"placeholder="Enter Email"className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.email}/>
          {formik.touched.email && formik.errors.email ? (<small className=" text-danger">{formik.errors.email}</small>) : null}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone </label>
          <input id="phone"name="phone"type="phone"placeholder="Enter phone"className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.phone}/>
          {formik.touched.phone && formik.errors.phone ? (<small className=" text-danger">{formik.errors.phone}</small>) : null}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password"name="password"type="password"placeholder="Enter Password "className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.password}/>
          {formik.touched.password && formik.errors.password ? (<small className="text-danger ">{formik.errors.password}</small>
          ) : null}
          </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password </label>
          <input id="cpassword"name="cpassword"type="password"placeholder="Enter Confirm Password"className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.cpassword}/>
          {formik.touched.cpassword && formik.errors.cpassword ? (<small className=" text-danger">{formik.errors.cpassword}</small>) : null}
        </div>
        <div className="text-center"> 
        <div className="btns">
        <button type="submit" className="btn btn-success">Sing Up</button>
          </div> 
         <NavLink to="/login"> I have Already Account </NavLink> 
         </div>
        <ToastContainer theme="dark" position="top-center" />
      </form>
    </div>
    </>
  );
};
export default Singup;
