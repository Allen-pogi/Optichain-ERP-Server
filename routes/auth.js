const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontroller'); // adjust if your path is different

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser); // this will work once you define loginUser

module.exports = router;
