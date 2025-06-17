const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads", // This is the bucket name (will be used in MongoDB as uploads.files and uploads.chunks)
    };
  },
});

const upload = multer({ storage });

module.exports = upload;
