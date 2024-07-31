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

exports.getAllBooks = async (req, res) => {
  try {
    // Fetch all users and their books
    const users = await Main.find();
    const books = users.flatMap((user) => user.books); // Extract books from all users
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    console.log("Fetching user with email:", req.params.email); // Log request params

    const user = await Main.findOne({ email: req.params.email });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
