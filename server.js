// Import necessary modules and dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose"); // If you're using MongoDB

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for cross-origin requests
app.use(morgan("combined")); // Request logging middleware (optional)

// Define your API routes here
const authRoutes = require("./routes/authRoutes");
// const userRoutes = require("./routes/userRoutes");
// const postRoutes = require("./routes/postRoutes");
const connectDB = require("./config/database");
// Add more route files as needed
connectDB();
app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// Add more route usage as needed

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
