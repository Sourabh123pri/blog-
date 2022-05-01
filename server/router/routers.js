const express = require("express");
const auth = require("../auth/auth");

// import blog functions
const {postBlog,updateBlog,deleteBlog,sendAllBlog,sendOneBlog,like,disLike,} = require("../blogHendler/blogHendler");

// import user functions
const {register,logout,login,about,userUpdate,userDelete,contact, saveBlog, getAllsaveBlog, removeSaveBlog, passwordchange,} = require("../userHendler/userHendle");


const router = express.Router();

// ------User Routers
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/about").get(auth, about);

router.route("/update").put(auth, userUpdate).delete(auth, userDelete);

router.route("/logout").get(auth, logout);

router.route("/contact").post(auth, contact);

router.route("/saveblog").post(auth, saveBlog);

router.route("/get/saveblog").get(auth, getAllsaveBlog);

router.route("/remove/saveblog").put(auth, removeSaveBlog);

router.route("/change/password").put(auth, passwordchange);

// ------ Blog Routers
router.route("/post").post(auth, postBlog);

router.route("/blogs").get(sendAllBlog);

router.route("/like").put(auth, like);

router.route("/unlike").put(auth, disLike);

router.route("/blog/update/:id").put(auth, updateBlog).delete(auth, deleteBlog).get(auth, sendOneBlog);

module.exports = router;
