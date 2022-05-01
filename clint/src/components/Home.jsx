import React,{useState,useEffect} from 'react'
import moment from "moment"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";


const Home = () => {
  const [show, setShow] = useState(false)
  const [loader, setLoader] = useState(true)
  const [blogs, setBlogs] = useState([])


const allBlog = async ()=>{
    const res = await axios.get("/blogs")
    if(res.status === 200) setLoader(false)
    setBlogs(res.data.message)
}

useEffect(() => {
  allBlog()
}, [])

const like =async (blogId)=>{
 const res = await axios.put("/like",{blogId});
 if(res.data.message === "This user has not token" ){
   toast.warn('please log in then like')
 }else{
  if(res.data.message === "liked"){
    toast.success(' Like')
     allBlog()
    }else{
      toast.warn(res.data.message)
    }
 }


}

const dislike = async(blogId)=>{
  const res = await axios.put("/unlike",{blogId});
  if(res.data.message === "This user has not token"){
    toast.warn('please log in then Dislike')
  }
  if(res.data.message === "unLiked"){
    toast.success('Dislike')
    allBlog()}
}

const saveBlog = async (blogId)=>{
  const respons = await axios.post('/saveblog',{blogId});
  if(respons.data.message === "This user has not token"){
    toast.warn('please log in then save blog')
  }
  if(respons.data.message === "Blog save"){
    toast.success("Blog saved")
  }
}

  const formik = useFormik({
    initialValues: { title: "", blog: "" },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(100, "Must be 100 characters or less")
        .min(10, "Must be 10 characters or greater")
        .required("Required"),
        blog: Yup.string()
        .min(12,"Must be 12 characters or greer")
        .max(1000,"Must be 500 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios.post("/post", values).then((res)=>res).then((data)=>{
        if(data.data.message === "This user has not token"){
          toast.warn("please Login Then Post Blog") 
          setShow(false)
        }else{
          toast.success(data.data.message) 
          allBlog()
          setShow(false)
        } 
      }).catch((err)=>console.log(err));
    },
  });

  if(loader) return <div className="loader"></div>
  return (
    <>
    <div className="home container my-3 text-capitalize">
      {blogs.map((blog)=>{
        return(
          <>
            <div className="card my-4" key={Date.now()}>
              <div className="card-header  d-flex justify-content-between">
                <h5>  {blog.title} </h5>
                <div><i className="fa fa-bookmark " onClick={()=>saveBlog(blog._id)}  aria-hidden="true"></i></div>
              </div>
                  <div className="card-body text-muted">
                    <blockquote className="blockquote mb-0">
                      <p>{blog.blog}</p>
                      <footer className="blockquote-footer">Post by <cite title={blog.name}> {blog.name}</cite>
                          <div className="text-right"><small className="text-muted">{   moment(blog.date).fromNow()} </small></div>
                      </footer>
                    </blockquote>
                  </div>
                  <span className='mx-3 text-secondary' >{blog.likes.length} Likes </span>
                  <div className=" d-flex justify-content-between">
                    <div className="likeBtn ">
                      <i className="fa fa-thumbs-up mx-3 " onClick={()=>like(blog._id)} aria-hidden="true"></i>
                      <i className="fa fa-thumbs-down "  onClick={()=>dislike(blog._id)}  aria-hidden="true"></i>
                    </div>
              </div>
            </div>
          </>
        )
      })}
      
 {show ? 
 <div className="blogcontainer fixed-top" >
 <div className="container bgColor my-5 rounded">
     <h1 className="font-weight-bold text-center pt-3">Post Blog </h1>
     <form onSubmit={formik.handleSubmit} className="py-5">
       <div className="form-group">
         <label htmlFor="title">Title </label>
         <input id="title"name="title"type="title"placeholder="Enter title"className="text-capitalize form-control"onChange={formik.handleChange}
           onBlur={formik.handleBlur}value={formik.values.title}/>
         {formik.touched.title && formik.errors.title ? (<small className=" text-danger">{formik.errors.title}</small>) : null}
       </div>

       <div className="form-group">
         <label htmlFor="blog">Blog</label>
         <textarea id="blog"name="blog"placeholder="Enter blog "className="text-capitalize form-control "rows="5" onChange={formik.handleChange}
           onBlur={formik.handleBlur}value={formik.values.blog}/>
         {formik.touched.blog && formik.errors.blog ? (<small className="text-danger ">{formik.errors.blog}</small>
         ) : null}
         </div>

       <button type="submit" className="btn btn-success">Post </button>
       <ToastContainer theme="dark" position="top-center" />
     </form>
   </div>
  </div>
 : null}
    </div>
      <div className="btnShow">
         <button type="button" className="btn btn-outline-success my-3" onClick={()=>{show ? setShow(false) : setShow(true)}}>{show ? "cancle"  : "post Blog"}</button> 
      </div>
      </>
  )
}

export default Home