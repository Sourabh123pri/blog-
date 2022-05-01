const AllBlog = require("../DB/blogSchema");
const mongoose =require("mongoose");
// Create Blog
const postBlog = async (req, res) => {
  const { title, blog } = req.body;
  const name = req.rootUser.name;
  if (!title || !blog) {
    res.status(400).json({ message: "Fill all filad" });
  } else {
    await AllBlog.create({ title, blog, name });
    res.status(201).json({ message: "Blog Posted!" });
  }
};

// Send  All Blogs 
const sendAllBlog = async (req, res) => {
  const blog = await AllBlog.find();
  if (blog) res.status(200).json({ message: blog });
  else res.status(400).json({ message: "There is no Blog ! " });
};

// like 
const like = async (req,res)=>{
  const {blogId } = req.body;
 const  userId = req.rootUser;
 const checkLike = await AllBlog.findById(blogId);
 const {likes} = checkLike;
  if( likes.includes(userId._id)){
    res.json({message:"You are already liked"})
  }else{
    await AllBlog.findByIdAndUpdate(blogId,{$push:{likes:userId}},{new: true,useFindAndModify: true,runValidators: true,})
    res.json({message:"liked"})
  }
}

// dislike
const disLike = async (req,res)=>{
  const {blogId } = req.body;
 const  userId = req.rootUser;
  let blog =  await AllBlog.findByIdAndUpdate(mongoose.Types.ObjectId(blogId),{$pull:{likes:mongoose.Types.ObjectId(userId)}},{
    new: true,
     })
  if(!blog){
    res.json({message:"not unLiked"})
  }else{
    res.json({message:"unLiked"})
  }
}

// send One Blog For Update
const sendOneBlog = async (req,res)=>{
  const blog = await AllBlog.findById(req.params.id);
  res.json({message:blog})
}

// Update Blog
const updateBlog = async (req, res) => {
  try {
    let blog = await AllBlog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: true,
      runValidators: true,
    });
    blog ?  res.status(201).json({ message: "Blog Update!" }) : res.json({ message: "Blog Not Found!" });
  } catch (error) {
    console.log(error);
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  let blog = await AllBlog.findById(req.params.id);
  if (blog) {
    blog = await blog.remove();
    res.status(200).json({ message: "Blog Delete!" });
  } else {
    res.status(400).json({ message: "Blog Not Found!" });
  }
};

module.exports = { postBlog, sendAllBlog,sendOneBlog,like, disLike, updateBlog, deleteBlog };
