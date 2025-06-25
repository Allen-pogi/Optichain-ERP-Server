const express = require("express");
const router = express.Router();
const authController = require("../controllers/authcontroller"); // adjust if your path is different

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser); // this will work once you define loginUser
router.get("/user", authController.getCurrentUser);
router.get("/users", authController.getAllUsers); // optionally protect with requireAdmin
router.put("/users/:id/role", authController.updateUserRole);

module.exports = router;
