const crypto = require("crypto");

// Generate a random JWT secret (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString("hex");

// Output the generated JWT secret
console.log("Generated JWT_SECRET:", jwtSecret);
