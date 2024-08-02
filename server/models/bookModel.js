const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  by: {
    type: String,
    default: "John",
  },
  text: {
    type: String,
    default: "Doe",
  },
});

const userReviewSchema = new mongoose.Schema({
  by: {
    type: String,
    default: "John",
  },
  text: {
    type: String,
    default: "Doe",
  },
});

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
  reviews: [reviewSchema],
});

const userAdded = new mongoose.Schema({
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
  reviews: [userReviewSchema],
});

// const userAdded = new mongoose.Schema({
//     title: String,
//     subtitle: String,
//     isbn13: Number,
//     price: Number,
//     image: String,
//     authors:
//     reviews: [reviewSchema],
// })

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
  added: [userAdded],
});

const Main = mongoose.model("Main", userSchema);

module.exports = Main;
