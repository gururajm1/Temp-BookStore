// server.js (or your main server file)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const userRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 7001;

// Middleware
app.use(cors()); // Enable CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend origin
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://guruguru6631:gururajm1@cluster0.tskztpg.mongodb.net/teet",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Routes
app.use("/api", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
