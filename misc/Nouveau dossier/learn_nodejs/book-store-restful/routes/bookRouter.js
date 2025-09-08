/* eslint-disable no-underscore-dangle */
const express = require('express');

function routes(Book) {
  const bookRouter = express.Router();

  // Get books by query filter(s)
  bookRouter
    .route('/books')
    .get((req, res) => {
      // const query = {genre: 'Fantasy'};
      const { query } = req;
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    })
    .post((req, res) => {
      // Use the body-parser Middleware to intercept the request and pull up the body dynamically
      const book = new Book(req.body);
      book.save(); // This is a synchronous call; may not be optimized for performance
      console.log(`The posted book: \n ${book}`);
      return res.status(201).json(book);
    });

  // Add a custome Middleware to intercept requests, and add a db found book on the fly to req
  //  This will allow us to reuse code for GET, PUT, and PATH verbs
  // So no need to recall Book.findById again and again
  bookRouter.use('/books/:bookId', (req, res, next) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book; // Add MongoDB found book as an object to the intercepeted request
        return next(); // Execute the next interceptor or the actual http call
      }
      return res.sendStatus(404); // Return 404 http status If book is not found in MongooDB
    });
  });

  // Get book by id_
  bookRouter.route('/books/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save((err) => {// Handle saving and response asynchronously
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      const { book } = req;
      if (req.body._id) {
        // We do not want to update _id
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        book[key] = value;
      });
      book.save((err) => {// Handle saving and response asynchronously
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove();
      res.sendStatus(204);
    });

  return bookRouter;
}

module.exports = routes;
