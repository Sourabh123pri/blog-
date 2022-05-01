const jwt = require("jsonwebtoken");
const user = require("../DB/userSchema");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.chacha;
    if (token) {
      const tokenverify = jwt.verify(token, process.env.SECRET_JWT);
      const users = await user.findOne({_id:tokenverify._id})
      req.rootUser = users
      next()
    } else {
      res.status(200).json({ message: "This user has not token" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = auth;
