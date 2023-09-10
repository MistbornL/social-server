const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authController = require("../controllers/authController");

// Import the User model (adjust the import path based on your project structure)
const User = require("../models/user");

// Registration route
router.post("/register", authController.register);

// Login route
router.post("/login", authController.login);
module.exports = router;
