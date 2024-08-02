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
  try {
    const { email, isbn13, title, subtitle, price, image } = req.body;

    // Find the user by email
    const user = await Main.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the book in user's collection
    const book = user.books.find((book) => book.isbn13 === isbn13);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Update book details
    book.title = title;
    book.subtitle = subtitle;
    book.price = price;
    book.image = image;

    await user.save();

    res.json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateAddedBook = async (req, res) => {
  try {
    const { email, isbn13, title, subtitle, price, image } = req.body;

    // Find the user by email
    const user = await Main.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Find the book in the added list
    const book = user.added.find((book) => book.isbn === isbn13);
    if (!book)
      return res.status(404).json({ message: "Book not found in added list" });


    // Update book details
    book.title = title;
    book.subtitle = subtitle;
    book.price = price;
    book.image = image;

    await user.save();

    res.json({ message: "Added book updated successfully" });
  } catch (error) {
    console.error("Error updating added book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.updateBooks = async (req, res) => {
  try {
    const email = req.params.email;
    const newBook = req.body.book;

    // Log incoming data for debugging
    console.log("Received book data:", newBook);

    // Find the user by email
    const user = await Main.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new book to the user's books array
    user.books.push({
      ...newBook,
      userAdded: true, // Ensure userAdded is set to true
    });

    // Save the updated user document
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updaBooks = async (req, res) => {
  try {
    const email = req.params.email;
    const newBook = req.body.book;

    // Log incoming data for debugging
    console.log("Received book data:", newBook);

    // Find the user by email
    const user = await Main.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new book to the user's books array
    user.books.push({
      ...newBook,
      userAdded: true, // Ensure userAdded is set to true
    });

    // Save the updated user document
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update your controller to handle adding books
exports.addBook = async (req, res) => {
  try {
    const { email, bookData } = req.body;

    if (!email || !bookData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await Main.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingBook = user.added.find(
      (book) => book.isbn13 === bookData.isbn13 // Ensure this matches the schema field
    );

    if (existingBook) {
      Object.assign(existingBook, {
        name: bookData.bookName,
        author: bookData.authorName,
        subtitle: bookData.subtitle,
        desc: bookData.description,
        price: bookData.bookPrice,
        publisher: bookData.publisher,
        year: bookData.publicationYear,
        pages: bookData.pages,
        url: bookData.imageLink,
        isbn13: bookData.isbn13,
        language: bookData.language,
      });
    } else {
      user.added.push({
        name: bookData.bookName,
        author: bookData.authorName,
        subtitle: bookData.subtitle,
        desc: bookData.description,
        price: bookData.bookPrice,
        publisher: bookData.publisher,
        year: bookData.publicationYear,
        pages: bookData.pages,
        url: bookData.imageLink,
        isbn13: bookData.isbn13, // Ensure this matches the schema field
        language: bookData.language,
      });
    }

    await user.save();
    res.status(200).json({ message: "Book added/updated successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




const addUserAddedBookToBooksArray = async (req, res) => {
  const { email, book } = req.body;
  try {
    const user = await Main.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is already in the user's books array
    const existingBook = user.books.find((b) => b.isbn13 === book.isbn13);

    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Book already exists in the user's books array" });
    }

    // Add the book to the books array
    user.books.push({
      ...book,
      userAdded: true,
    });

    await user.save();
    res
      .status(200)
      .json({ message: "Book added to user's books array successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};