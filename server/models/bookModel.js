// models/userModel.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewDesc: String,
});

const bookSchema = new mongoose.Schema({
  // Embedding bookSchema in the userSchema
  userAdded: {
    type: Boolean,
    default: false, // Default value if not provided
  },
  title: String,
  subtitle: String,
  isbn13: String,
  price: String,
  image: String,
  url: String,
  reviews: [reviewSchema],
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  books: [bookSchema],
});

const Main = mongoose.model("Main", userSchema);

module.exports = Main;
