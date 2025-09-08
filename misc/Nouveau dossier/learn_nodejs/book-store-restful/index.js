require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const app = express();
const port = process.env.PORT || 3000;

// Open a databse connection
// eslint-disable-next-line no-unused-vars
mongoose.connect('mongodb://localhost/books-api');

/*
  Initialize body parser middleware and register with the app
  This will intercept below registered type of requests add add body object to the req object
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register the router with the app on the /api path
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to bookstore RESTful Nodemonitor app');
});

app.listen(port, () => {
  console.log(`Express server is listening on port ${port}`);
});
