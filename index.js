require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

//Import routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const fileRoutes = require("./routes/file");
app.use("/api/files", fileRoutes);

const favoritesRoutes = require("./routes/favorites");
app.use("/api/favorites", favoritesRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Hello 123 bang");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
