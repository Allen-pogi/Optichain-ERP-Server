const express = require('express');
const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const { GridFSBucket } = require('mongodb');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const router = express.Router();

// ✅ GridFS Storage engine for uploads
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: {
            originalName: file.originalname,
            uploadDate: new Date(),
          },
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });


// ✅ Upload Route
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ file: req.file });
});


// ✅ Download/View Route
router.get('/file/:filename', async (req, res) => {
  try {
    const db = mongoose.connection.db;
const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'uploads' });

    
    // const bucket = new GridFSBucket(db, { bucketName: 'uploads' });

    const file = await db.collection('uploads.files').findOne({ filename: req.params.filename });
    if (!file) return res.status(404).json({ error: 'File not found' });

    res.setHeader('Content-Type', file.contentType || 'application/octet-stream');
    res.setHeader('Content-Disposition', `inline; filename="${file.metadata?.originalName || file.filename}"`);


const stream = bucket.openDownloadStreamByName(req.params.filename);
stream.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
