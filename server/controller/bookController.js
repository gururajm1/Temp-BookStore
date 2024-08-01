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


exports.signUpUser = async (req, res) => {
  try {
    const { name, email, age, books } = req.body;

    // Create a new user document with the "userAdded" field
    const newUser = new Main({
      name,
      email,
      age,
      books,
      userAdded: true, // Include this field in the user document
    });

    // Save the user document to MongoDB
    await newUser.save();

    res.status(201).json({ message: "User signed up successfully" });
  } catch (err) {
    console.error("Error signing up user:", err);
    res.status(500).json({ error: "Server error, failed to sign up" });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const { email, isbn13 } = req.body; // Extract email and ISBN-13 from request body

    // Find the user by email
    const user = await Main.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the index of the book to delete
    const bookIndex = user.books.findIndex((book) => book.isbn13 === isbn13);

    if (bookIndex === -1) {
      return res
        .status(404)
        .json({ message: "Book not found in user's collection" });
    }

    // Remove the book from the user's collection
    user.books.splice(bookIndex, 1);
    await user.save();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateBook = async (req, res) => {
  const { email, isbn13, title, subtitle, price, image } = req.body;

  console.log("Received update request for book with ISBN13:", isbn13);
  console.log("Email:", email);
  console.log("New title:", title);
  console.log("New subtitle:", subtitle);
  console.log("New price:", price);
  //console.log("New image:", image);

  try {
    const user = await Main.findOne({ email });

    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const book = user.books.find((book) => book.isbn13 === isbn13);

    if (!book) {
      console.error("Book not found");
      return res.status(404).json({ message: "Book not found" });
    }

    // Log the old book details
    console.log("Old book details:", book);

    // Update the book details
    book.title = title;
    book.subtitle = subtitle;
    book.price = price;
    book.image = image;

    // Log the updated book details
    console.log("Updated book details:", book);

    // Save the user with the updated book details
    await user.save();

    // Fetch the updated user from the database to confirm changes
    const updatedUser = await Main.findOne({ email });
    const updatedBook = updatedUser.books.find((b) => b.isbn13 === isbn13);

    // Log the book details from the database after save
    console.log("Book details from database after save:", updatedBook);

    console.log("Book updated successfully");
    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Error updating book", error });
  }
};
