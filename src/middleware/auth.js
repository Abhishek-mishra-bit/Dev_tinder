const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("../models/user");

// const adminAuth = (req, res, next) => {
//   const token = "xyza";
//   const isTokenAuthenticated = token === "xyz";
//   if (!isTokenAuthenticated) {
//     res.status(403).send("admin is not authenticated");
//   } else {
//     res.send("admin is authenticated");
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) res.send("token is invalid");
    const decodeMessage = await jwt.verify(token, "Abhishek@devtinder");
    const { _id } = decodeMessage;
    const user = await User.findById({ _id });
    if (!user) res.send("user not found");
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};
module.exports = {
  userAuth,
};
