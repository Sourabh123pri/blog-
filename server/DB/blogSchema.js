const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userBlog = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  blog: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  likes: [
    {
      type:ObjectId,
      ref:"User"
    }
  ],
  date: {
    type: String,
    require: true,
    default:new Date().toISOString(),
  },
});

const AllBlog = mongoose.model("blog", userBlog);

module.exports = AllBlog;
