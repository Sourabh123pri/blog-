import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";


const Contact = () => {



    const formik = useFormik({
      initialValues: {name:"", email: "" ,phone:"", message: "" },
      validationSchema: Yup.object({
        name: Yup.string().min(3,"Must be 3 characers").max(15, "Must be 15 characters or less").required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string().min(10,"Only 10 digits").max(10,"Only 10 digits").required("Required"),
        message: Yup.string().min(6,"must be 6 characters").max(150, "Must be 15 characters or less").required("Required"),

      }),
      onSubmit: (values) => {
            axios.post("/contact", values).then((res)=>res).then((data)=>{
              if(data.data.message === "This user dose't have token "){
                toast.warn("You are not Log in");
              }
              toast.success(data.data.message);
        }).catch((err)=>console.log(err));
      },
    });
  return (
    <div className="container bgColor my-5 rounded">
      <h1 className="font-weight-bold text-center pt-3">Contact Us </h1>
      <form onSubmit={formik.handleSubmit} className="py-5">
        <div className="form-group">
          <label htmlFor="name">Name </label>
          <input id="name"name="name"type="name"placeholder="Enter Name"className="form-control"onChange={formik.handleChange}
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
          <input id="phone"name="phone"type="phone"placeholder="Enter Phone"className="form-control"onChange={formik.handleChange}
            onBlur={formik.handleBlur}value={formik.values.phone}/>
          {formik.touched.phone && formik.errors.phone ? (<small className=" text-danger">{formik.errors.phone}</small>) : null}
        </div>

        
        <div className="form-group">
         <label htmlFor="message">Message</label>
         <textarea id="message"name="message"type="message"placeholder="Enter message "className="text-capitalize form-control "rows="5" onChange={formik.handleChange}
           onBlur={formik.handleBlur}value={formik.values.message}/>
         {formik.touched.message && formik.errors.message ? (<small className="text-danger ">{formik.errors.message}</small>
         ) : null}
         </div>

        <button type="submit" className="btn btn-success">Send</button>
        <ToastContainer theme="dark" position="top-center" />
      </form>
    </div>
  );
};
export default Contact;
