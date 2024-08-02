// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/bookController");

// Route for user signup
router.post("/signup", userController.signUpUser);
router.put("/update-book", userController.updateBook);
router.put("/added-update", userController.updateAddedBook);
router.delete("/added-delete", userController.deleteBook);
router.put("/users/:email", userController.updateBooks);
router.get("/users/:email", userController.getUserByEmail);
router.delete("/delete-book", userController.deleteBook);
router.post("/add-book", userController.addBook);

// router.put("/add-book", async (req, res) => {
//   const { email, book, added } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const bookIndex = user.books.findIndex((b) => b.isbn13 === book.isbn13);
//     if (bookIndex === -1) {
//       user.books.push({ ...book, added: added || false });
//     } else {
//       // Update the existing book
//       user.books[bookIndex] = { ...book, added: added || false };
//     }

//     await user.save();
//     res.status(200).json({ message: "Book added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating book", error });
//   }
// });



// routes/userRoutes.js
router.post("/add-review", async (req, res) => {
  try {
    const { isbn13, review } = req.body;

    if (!isbn13 || !review || !review.by || !review.text) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the book with the provided ISBN
    const user = await Main.findOne({ "books.isbn13": isbn13 });

    if (!user) {
      return res.status(404).json({ message: "Book not found" });
    }

    const book = user.books.find((book) => book.isbn13 === isbn13);

    if (!book) {
      return res.status(404).json({ message: "Book not found in user's collection" });
    }

    // Add the review to the book's reviews array
    book.reviews.push(review);
    await user.save();

    res.status(200).json({ message: "Review added successfully", book });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});





module.exports = router;
