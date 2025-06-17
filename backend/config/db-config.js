const mongoose = require("mongoose");
const dotenv=require('dotenv').config();
const DB_URL = process.env.MONGODB_URI;
const connectDB = async () => {
  await mongoose
    .connect(DB_URL)
    .then(() => console.log("MongoDB connected successfully 🚀"))
    .catch((err) => {
      console.error("MongoDB connection failed", err);
      process.exit(1); // Exit the process with failure
    });
};

module.exports=connectDB;
