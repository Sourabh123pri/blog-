const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  saveBlogs:[
    {
      type:ObjectId,
      ref:"User"
    }
  ],
  messages: [
    {
      message: {
        type: String,
        require: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

userSchema.methods.generatToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET_JWT, {
      expiresIn: "3d",
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.addmessage = async function (message) {
  this.messages = this.messages.concat({ message });
  await this.save();
  return this.messages;
};


const users = mongoose.model("user", userSchema);

module.exports = users;
