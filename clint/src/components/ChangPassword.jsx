import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangPassword = () => {
 const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { oldp: "", password: "", cpassword: "" },
    validationSchema: Yup.object({
       oldp: Yup.string().min(5, "Must be 5 characers less").max(15, "Must be 15 characters or gratear").required(),
        password: Yup.string().min(5, "Must be 5 characers less").max(15, "Must be 15 characters or gratear").required(),
      cpassword: Yup.string().oneOf([Yup.ref("password"),null],"Dosent match ").required(),
    }),
    onSubmit: (values) => {
      axios
        .put(`/change/password`, values)
        .then((res) => res)
        .then((data) => {
          if (data.data.message === "Password Successfully!!") {
            toast.success(data.data.message);
            navigate("/profile");
          } else {
            toast.warn(data.data.message);
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <>
      <div className="changePassword">
        <ToastContainer theme="dark" position="top-center" />

        <div className="container bgColor my-5 rounded  ">
          <h1 className="font-weight-bold text-center pt-3">Change password</h1>
          <form onSubmit={formik.handleSubmit} className="py-5">
            <div className="form-group">
              <label htmlFor="oldp">Old Password </label>
              <input id="oldp"name="oldp"type="password"placeholder="Enter old password"className=" form-control"onChange={formik.handleChange}onBlur={formik.handleBlur}value={formik.values.oldp}/>
              {formik.touched.oldp && formik.errors.oldp ? (<small className=" text-danger">{formik.errors.oldp}</small>) : null}
            </div>
            
            <div className="form-group">
              <label htmlFor="password"> Password </label>
              <input id="password"name="password"type="password"placeholder="Enter password"className=" form-control"onChange={formik.handleChange}onBlur={formik.handleBlur}value={formik.values.password}/>
              {formik.touched.password && formik.errors.password ? (<small className=" text-danger">{formik.errors.password}</small>) : null}
            </div>

            <div className="form-group">
              <label htmlFor="cpassword">Confirm Password </label>
              <input id="cpassword"name="cpassword"type="password"placeholder="Enter confirm password"className=" form-control"onChange={formik.handleChange}onBlur={formik.handleBlur}value={formik.values.cpassword}/>
              {formik.touched.cpassword && formik.errors.cpassword ? (<small className=" text-danger">{formik.errors.cpassword}</small>) : null}
            </div>
            
           
            <div className="mx-2">
              <button className="btn btn-outline-warning " type="submit">Change Password</button>
              <button className="btn btn-outline-primary mx-2 "onClick={() => navigate("/profile")}>Cancle</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangPassword;
