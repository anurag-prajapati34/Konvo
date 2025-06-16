const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    //create a new user
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        const newUser = new User({
          name,
          email,
          password: hash,
        });
        await newUser.save();

        console.log("User created successfully", newUser);

        return res.status(201).json({
          success: true,
          message: "User registered successfully",
          user: newUser,
        });
      });
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(5000).json({
      success: false,
      message: "Internal server error",
      errr: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("user credentials : ", {
      email,
      password,
    });
    const isUserExists = await User.findOne({ email });

    if (!isUserExists) {
      return res.status(400).json({
        status: false,
        message: "Invalid credentials , user not exists ",
      });
    }

    console.log("User found:", isUserExists);

    bcrypt.compare(password, isUserExists.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      if (!result) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      //jwt token creation
      const token = jwt.sign(
        {
          userId: isUserExists._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      console.log("JWT Token 🪪 :", token);

      //set cookies
      res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
      });
    });
  } catch (error) {
    console.error("Error in user loign:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
        success:true,
        message:"User loged out successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
