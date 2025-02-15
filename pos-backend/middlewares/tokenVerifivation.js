const jwt = require("jsonwebtoken"); // ✅ Import jsonwebtoken
const createHttpError = require("http-errors");
const config = require("../config/config");
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return next(createHttpError(401, "Please provide a token!"));
    }

    const decodedToken = jwt.verify(accessToken, config.accessTokenSecret);

    const user = await User.findById(decodedToken._id);
    if (!user) {
      return next(createHttpError(401, "User does not exist!"));
    }

    req.user = user; // ✅ Attach user to request
    next();
  } catch (error) {
    return next(createHttpError(401, error.message)); // ✅ Return actual JWT error message
  }
};

module.exports = { isVerifiedUser };
