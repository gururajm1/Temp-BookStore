// models/userModel.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  isbn13: String,
  price: String,
  image: String,
  url: String,
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
  books: [bookSchema], // Embedding bookSchema in the userSchema
});

const Main = mongoose.model("Main", userSchema);

module.exports = Main;
