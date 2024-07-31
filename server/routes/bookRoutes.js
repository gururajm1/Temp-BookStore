// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controller/bookController");

// Route for user signup
router.post("/signup", userController.signUpUser);
router.get("/books", userController.getAllBooks);
router.get("/users/:email", userController.getUserByEmail);
// router.get("/users/:email", async (req, res) => {
//   try {
//     const user = await Main.findOne({ email: req.params.email });
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


module.exports = router;
