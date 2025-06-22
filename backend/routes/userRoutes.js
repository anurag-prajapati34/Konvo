const express = require("express");
const { getUserProfile } = require("../controllers/user-controllers");
const router = express.Router();

router.get("/profile",getUserProfile );

module.exports = router;
