const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const register = async (req, res, next) => {
  try {
    const { name, phone, email, password, role } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !password || !role) {
      return next(createHttpError(400, "All fields are required!"));
    }

    // Check if user already exists (by email or phone)
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return next(createHttpError(400, "User already exists!"));
    }

    // Ensure password is a valid string before hashing
    if (typeof password !== "string") {
      return next(createHttpError(400, "Invalid password format!"));
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    // Remove password from response
    const { password: _, ...userData } = newUser._doc;

    res
      .status(201)
      .json({ success: true, message: "New user created!", data: userData });
  } catch (error) {
   next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createHttpError(400, "All fields are required!"));
    }

    const isUserPresent = await User.findOne({ email });
    if (!isUserPresent) {
      return next(createHttpError(401, "Invalid Credentials"));
    }

    const isMatch = await bcrypt.compare(password, isUserPresent.password);
    if (!isMatch) {
      return next(createHttpError(401, "Invalid Credentials"));
    }

    const accessToken = jwt.sign(
      { _id: isUserPresent._id, role: isUserPresent.role },
      config.accessTokenSecret,
      { expiresIn: "1d" }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    // Remove password before sending user data
    const { password: _, ...userData } = isUserPresent._doc;

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      token: accessToken,
      data: userData, // Return user data without password
    });

  } catch (error) {
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return next(createHttpError(401, "Unauthorized access!"));
    }

    const user = await User.findById(req.user._id).select("-password"); // 🔐 Exclude password
    if (!user) {
      return next(createHttpError(404, "User not found!"));
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};


module.exports = { register, login,getUserData };
