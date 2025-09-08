const mongoose = require('mongoose');

// Destrcture the Schema from mongoose
const { Schema } = mongoose;

// Define the MongoDB data model for a book entity
const bookModel = new Schema({
  title: { type: String },
  author: { type: String },
  genre: { type: String },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model('Book', bookModel);
