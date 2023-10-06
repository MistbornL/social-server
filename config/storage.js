const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where uploaded images will be stored
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Define the file name for the uploaded image (you can customize this)
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
