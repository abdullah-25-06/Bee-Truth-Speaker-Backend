const ErrorHander = require("../utils/errorHander")
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");


exports.adminHeader = catchAsyncErrors(async (req, res, next) => {
  const allowedPaths = ['/get-tiktok-posts', '/get-face-posts', '/get-twitter-posts', '/get-insta-posts', '/add-face-post']
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    decodedUser = await User.findById(decodedData.id);
    if (decodedUser.role === "admin") {
      req.user = { id: decodedUser.id, email: decodedUser.email, role: decodedUser.role }
      return next();
    }
  }
  catch (e) {
    return next()
  }
});