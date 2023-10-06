const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authController = require("../controllers/authController");

// Import the User model (adjust the import path based on your project structure)
const User = require("../models/user");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
// Registration route
router.post(
  "/register",
  upload.single("profilePicture"),
  authController.register
);

// Login route
router.post("/login", authController.login);
module.exports = router;
