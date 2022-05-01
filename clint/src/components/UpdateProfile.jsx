import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: { name:"", email: "", phone: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be 3 characers less")
        .max(15, "Must be 15 characters or gratear")
        .required(),
      email: Yup.string().email("Invalid email address").required(),
      phone: Yup.number().moreThan(10, "Only 10 digits more then").required(),
    }),
    onSubmit: (values) => {
      axios
        .put(`/update`, values)
        .then((res) => res)
        .then((data) => {
          if (data.data.message === "User update Success!!") {
            toast.success(data.data.message);
            navigate("/profile")
          } else {
            toast.warn(data.data.message);
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="updateProfile">
        <ToastContainer theme="dark" position="top-center" />

        <div className="container bgColor my-5 rounded  ">
          <h1 className="font-weight-bold text-center pt-3">
            Update Your Profile{" "}
          </h1>
          <form onSubmit={formik.handleSubmit} className="py-5">
            <div className="form-group">
              <label htmlFor="name">Name </label>
              <input id="name"name="name"type="name"placeholder="Enter name"className="text-capitalize form-control"onChange={formik.handleChange}
                onBlur={formik.handleBlur} value={formik.values.name}/>
              {formik.touched.name && formik.errors.name ? (<small className=" text-danger">{formik.errors.name}</small>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <small className=" text-danger">{formik.errors.email}</small>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone </label>
              <input
                id="phone"
                name="phone"
                type="phone"
                placeholder="Enter phone"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <small className=" text-danger">{formik.errors.phone}</small>
              ) : null}
            </div>
            <div className="mx-2">
              <button className="btn btn-outline-warning " type="submit">Update Profile</button>
              <button className="btn btn-outline-primary mx-2 " onClick={() => navigate("/profile")}>Cancle</button>
            </div>
           </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
