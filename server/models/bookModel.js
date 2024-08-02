const mongoose = require("mongoose");

// Review schema definition
const reviewSchema = new mongoose.Schema({
  by: String,
  text: String, // Ensure the field matches 'text' instead of 'msg'
});


// Book schema definition
const bookSchema = new mongoose.Schema({
  userAdded: {
    type: Boolean,
    default: false,
  },
  title: String,
  subtitle: String,
  isbn13: String,
  price: String,
  image: String,
  url: String,
});

// UserAdded schema definition
const userAddedSchema = new mongoose.Schema({
  name: String,
  author: String,
  subtitle: String,
  desc: String,
  price: Number,
  publisher: String,
  year: Number,
  pages: Number,
  url: String,
  isbn13: String,
  language: String,
});

// User schema definition
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
  books: {
    type: [bookSchema],
    default: [],
  },
  added: {
    type: [userAddedSchema],
    default: [],
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

// Create the Mongoose model for User schema
const Main = mongoose.model("Main", userSchema);

module.exports = Main;
