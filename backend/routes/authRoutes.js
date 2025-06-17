const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getLogedInUser,
} = require("../controllers/auth-controllers");
const authenticate = require("../middlewares/authenticate");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.delete("/logout", logoutUser);
router.get("/me",authenticate,getLogedInUser);
module.exports = router;
