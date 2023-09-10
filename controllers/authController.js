const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Registration controller
const register = async (req, res) => {
  try {
    const { username, password } = req.body; // Retrieve username and password from the request body

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Create a new user
    const newUser = new User({ username, password });

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
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the user-entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Create a JSON Web Token (JWT) for the user
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);

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
