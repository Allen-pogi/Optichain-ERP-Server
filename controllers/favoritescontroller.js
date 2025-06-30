// controllers/favoritesController.js
const Favorite = require("../models/favorites");

// Get all favorites for the current user
exports.getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ user: req.user._id });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: "Server error" });

    console.log("req.user:", req.user);
  }
};

// Add or remove a favorite
exports.toggleFavorite = async (req, res) => {
  const { path, label, panel } = req.body;

  try {
    const existing = await Favorite.findOne({
      user: req.user.id, // ✅ CORRECT
      path,
    });

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      res.json({ status: "removed" });
    } else {
      const newFavorite = await Favorite.create({
        user: req.user.id, // ✅ CORRECT
        path,
        label,
        panel,
      });
      res.json({ status: "added", favorite: newFavorite });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
};
