const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Missing type declaration
      ref: "User",
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    panel: {
      type: String,
      required: false,
    },
  },
  {
    // <-- Options object moved inside the parentheses
    timestamps: true,
    // Corrected index syntax:
    indexes: [{ user: 1, path: 1, unique: true }],
  }
);

module.exports = mongoose.model("Favorite", favoriteSchema);
