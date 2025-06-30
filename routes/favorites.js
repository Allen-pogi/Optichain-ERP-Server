const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritescontroller");
const authenticateToken = require("../middlewares/authenticateToken");

router.get("/", authenticateToken, favoritesController.getUserFavorites);

// POST toggle favorite (add/remove)
router.post("/toggle", authenticateToken, favoritesController.toggleFavorite); //

// Optional: DELETE a specific favorite

module.exports = router;
