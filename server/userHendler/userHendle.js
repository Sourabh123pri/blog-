const bcrypt = require("bcryptjs");
const user = require("../DB/userSchema");


// User Register 
const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    res.status(400).json({ message: "fill all feild" });
  } else {
    const userFind = await user.findOne({ email });
    if (userFind) {
      res.json({ message: "Your are Already Register" });
    } else {
      const createUser = await new user({ name, email, phone, password });
      await createUser.save();
      res.status(201).json({ message: "Register success" });
    }
  }
};

// User Login
const login = async (req, res) => {
  let token;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "please fill all feild" });
  } else {
    const userFind = await user.findOne({ email });
    if (userFind) {
      const matchPassword = await bcrypt.compare(password, userFind.password);
      
      if (matchPassword) {
        token = await userFind.generatToken();
        res.cookie("chacha", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 282098000),
        });
        res.json({ message: "Log in Successful. " });
      } else {
        res.json({ message: "Invalid User Detaile !! " });
      }
    } else {
      res.json({ message: "please Register then login ." });
    }
  }
};


// User About
const about = async (req, res) => {
  res.json({ message: req.rootUser });
};

// User Contact
const contact = async (req, res) => {
  const { email, message } = req.body;
  const userCont = await user.findOne({ email });
  const mess = await userCont.addmessage(message);
  res.json({ message: "Done ! Message send", mess });
};


// Save Blog Function
const saveBlog = async (req, res) => {
  const { blogId } = req.body;
  const userDetails = req.rootUser;
  let users = await user.findByIdAndUpdate(
    userDetails,
    { $push: { saveBlogs: blogId } },
    { new: true, useFindAndModify: true, runValidators: true }
  );
  if (!users) {
    res.json({ message: "not save blog" });
  } else {
    res.json({ message: "Blog save" });
  }
};

// Send All Blog
const getAllsaveBlog = async (req, res) => {
  const savedata = await user.findById(req.rootUser._id);
  res.json({ message: savedata.saveBlogs });
};

// Remove Save Blog
const removeSaveBlog = async(req,res)=>{
  const {blogId} = req.body;
  const userDetails = req.rootUser;
  const usersBlog = await user.findByIdAndUpdate(userDetails,{$pull:{saveBlogs:blogId}},{new:true})
  if(!usersBlog){
    res.json({message:"not remove "})
  }else{
    res.json({message:"Blog Removed.",usersBlog})
  }
}

// update User
const userUpdate = async (req, res) => {
  const { id } = req.rootUser;
  await user.findByIdAndUpdate(id, req.body, {
    new: true,
    useFindAndModify: true,
    runValidators: true,
  });
  res.json({ message: "User update Success!!" });
};

//password change
const passwordchange = async (req,res)=>{
  const {oldp , password } = req.body;
  let users = await user.findById(req.rootUser.id)
  const ismatch = await bcrypt.compare(oldp,users.password)
 if(ismatch){
   const hashPassword = await bcrypt.hash(password,10);
  users = await user.findByIdAndUpdate(req.rootUser.id ,{password:hashPassword},{new:true})
  if(users){
    return  res.json({ message: "Password Successfully!!" });
  }else{
    return  res.json({ message: "Not change password" });
  }
 }else{
  return res.json({message:"Old Password invalid !"})
 }
} 

// Delete User
const userDelete = async (req, res) => {
  const { id } = req.rootUser;
  let users = await user.findById(id);
  users = await users.remove();
  res.clearCookie("chacha");
  res.json({ message: "User deleted !" });
};

// Logout 
const logout = async (req, res) => {
  res.clearCookie("chacha");
  res.json({ message: " logout " });
};

module.exports = {
  register,
  login,
  about,
  contact,
  userUpdate,
  userDelete,
  logout,
  saveBlog,
  getAllsaveBlog,
  removeSaveBlog,
  passwordchange,
};
