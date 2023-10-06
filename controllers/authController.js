const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Registration controller
const register = async (req, res) => {
  try {
    const { username, password, email } = req.body; // Retrieve username, password, and email from the request body
    // Retrieve the uploaded profile picture
    console.log(req.body);
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Create a new user with image data (if provided)
    const newUser = new User({
      username,
      password,
      email,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!email) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the user-entered password with the hashed password in the database
    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      console.log();
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create a JSON Web Token (JWT) for the user
    const token = jwt.sign(
      {
        username: user.username,
        expiresIn: 60 * 60,
        profileImg: user.profilePicture,
      },
      process.env.JWT_SECRET
    );

    // Send the JWT as a response
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
};
