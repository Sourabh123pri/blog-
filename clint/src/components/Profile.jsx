import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState({});
  const [show, setShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [addBlogs, setaddBlogs] = useState([]);
  const [updateBlogs, setUpdateBlogs] = useState({ title: "", blog: "" });
  const [loader, setLoader] = useState(true)

  const getUser = async () => {
    const res = await axios.get("/about");
    if (res.data.message === "This user has not token") {
      setLoader(false)
      navigate("/login");
      setuser(null);
    } else setuser(res.data.message);
  };
  const allBlog = async () => {
    const res = await axios.get("/blogs");
    setBlogs(res.data.message);
  };

  useEffect(() => {
    getUser();
    allBlog();
  }, []);

  const editBlog = async (e) => {
    const findvalue = blogs.find((value) => value._id === e.target.id);
    // const res = await axios.get(`/blog/update/${e.target.id}`)
    await setUpdateBlogs(findvalue);
    setShow(true);
  };

  const deleteBlog = async (e) => {
    const res = await axios.delete(
      `/blog/update/${e.target.previousSibling.id}`
    );
    toast.success(res.data.message);
    allBlog();
  };
  
  const deleteUser = async () =>{
  const res = await axios.delete("/update")
    toast.success(res.data.message);
    navigate('/')
  }

  const getSaveData = async () => {
    const res = await axios.get("/get/saveblog");
    const filterItem = blogs.filter((blogItem) =>
      res.data.message.includes(blogItem._id)
    );
    setaddBlogs(filterItem);
  };

  const removeSaveBlog = async (blogId) => {
    const res = await axios.put("/remove/saveblog", { blogId });
    if (res.statusText === "OK") {
      toast.success(res.data.message);
      const filterItem = blogs.filter((blogItem) =>
        res.data.usersBlog.saveBlogs.includes(blogItem._id)
      );
      setaddBlogs(filterItem);
    }
  };

  const formik = useFormik({

 initialValues: { title: updateBlogs.title, blog: updateBlogs.blog } ,
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "Must be 30 characters or less")
        .min(10, "Must be 10 characters or greater")
        .required("Required"),
      blog: Yup.string()
        .min(12, "Must be 12 characters or greer")
        .max(500, "Must be 500 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .put(`/blog/update/${updateBlogs._id}`, values)
        .then((res) => res)
        .then((data) => {
          if (data.data.message === "Blog Update!") {
            toast.success(data.data.message);
            allBlog();
            setShow(false);
          } else {
            toast.warn(data.data.message);
            allBlog();
            setShow(false);
          }
        })
        .catch((err) => console.log(err));
    },
  });

  if(loader) return <div className="loader"></div>
  return (
    <>
      <div className="profile container text-capitalize">
        <ToastContainer theme="dark" position="top-center" />
        <div className="bg-dark text-light my-3 rounded text-center">
          <div>
            <h1>{user.name}</h1>
          </div>
          <div className="d-flex  justify-content-around">
          <h2>{user.email} </h2>
          <h3>{user.phone}</h3>
        </div>
        </div>
       
        {show ? (
          <div className="blogcontainer fixed-top">
            <div className="container bgColor my-5 rounded">
              <h1 className="font-weight-bold text-center pt-3">
                Update Blog{" "}
              </h1>
              <form onSubmit={formik.handleSubmit} className="py-5">
                <div className="form-group">
                  <label htmlFor="title">Title </label>
                  <input
                    id="title"
                    name="title"
                    type="title"
                    placeholder="Enter title"
                    className="text-capitalize form-control"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <small className=" text-danger">
                      {formik.errors.title}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="blog">Blog</label>
                  <textarea
                    id="blog"
                    name="blog"
                    type="blog"
                    placeholder="Enter blog "
                    className="text-capitalize form-control "
                    rows="5"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.blog}
                  />
                  {formik.touched.blog && formik.errors.blog ? (
                    <small className="text-danger ">{formik.errors.blog}</small>
                  ) : null}
                </div>

                <button type="submit" className="btn btn-success mx-3">
                  Update{" "}
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => setShow(false)}
                >
                  {" "}
                  Cancle{" "}
                </button>
                <ToastContainer theme="dark" position="top-center" />
              </form>
            </div>
          </div>
        ) : null}


        <div className="text-center">
          <div className="btn btn-outline-secondary mx-2 " onClick={getSaveData}>
            Show Add Blog
          </div>
          <div className="btn btn-outline-warning mx-2 my-1" onClick={()=> navigate('/updateprofile')}>
           Edit Profile
          </div>
          <div className="btn btn-outline-danger mx-2" onClick={deleteUser}>
           Delete Account
          </div>
          <div className="btn btn-outline-warning mx-2" onClick={()=> navigate('/changepassword')}>
           Change password
           </div>
        </div>

        {addBlogs.map((item, index) => {
          return (
            <div className="card my-3" key={index}>
              <div className="card-header  d-flex justify-content-between">
                <h5>{item.title} </h5>
                <div>
                  <i
                    className="fa fa-bookmark-o"
                    onClick={() => {
                      removeSaveBlog(item._id);
                    }}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <div className="card-body">
                <blockquote className="blockquote mb-0">
                  <p>{item.blog}</p>
                  <footer className="blockquote-footer">
                    Post by <cite title={item.name}> {item.name}</cite>
                    <div className="text-right">
                      <small className="text-muted">
                        {moment(item.date).fromNow()}{" "}
                      </small>
                    </div>
                    <div className="text-left"></div>
                  </footer>
                </blockquote>
              </div>
            </div>
          );
        })}
   
        <h4 className="text-center "> My Blogs <small></small> </h4>

        {blogs.reverse().map((blog, index) => {
          if (blog.name === user.name) {
            return (
              <div className="card my-3" key={index}>
                <div className="card-header">{blog.title}</div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p>{blog.blog}</p>
                    <footer className="blockquote-footer">
                      Post by <cite title={blog.name}> {blog.name}</cite>
                      <div className="text-right">
                        <small className="text-muted">
                          {moment(blog.date).fromNow()}{" "}
                        </small>
                      </div>
                      <div className="text-left">
                        <span>{blog.likes.length} Likes </span>
                      </div>
                      <div className="text-right">
                        <button
                          type="button"
                          id={blog._id}
                          onClick={editBlog}
                          className="btn btn-outline-warning mx-2"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={deleteBlog}
                          className="btn btn-outline-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </div>
            );
          }
          return null;
        })}

      </div>
    </>
  );
};

export default Profile;
