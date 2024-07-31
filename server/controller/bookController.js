// controllers/userController.js
const Main = require("../models/bookModel");

// Function to handle user signup
exports.signUpUser = async (req, res) => {
  try {
    const { name, email, age, books } = req.body;

    // Create a new user document
    const newUser = new Main({
      name,
      email,
      age,
      books,
    });

    // Save the user document to MongoDB
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Server error, failed to sign up" });
  }
};
