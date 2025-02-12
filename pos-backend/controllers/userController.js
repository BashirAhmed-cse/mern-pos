const createHttpError = require("http-errors");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


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

      res.status(201).json({ success: true, message: "New user created!", data: userData });
  
    } catch (error) {
      next(error);
    }
  };


const login = async (req, res, next) =>{

}

module.exports = {register, login}