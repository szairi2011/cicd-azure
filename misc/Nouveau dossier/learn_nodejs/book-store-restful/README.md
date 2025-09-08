An example of a NodeJS RESTfull web services API wiring a Mongo DB.

This example is inspired from the Pluralsight course -- `RESTfull web services with MongoDB & Express` 

The Github project for this course is also available under -- `https://github.com/jonathanfmills/RestfulAPIS`

## How to install the application
Run > npm install

## Configure eslint
To validate coding style rules and validate some anti-patterns, we can run `> npm run lint` script.
The first time we run eslint, we need a config file for it, as follows:
> npm run lint -- --init

# Install MongoDB
- Install MongoDB Community edition server
- Initialize books table by running below query from a bash command prompt:
    > mongo book-api < ./db/mongo/bookJson.js

# Run the app
We use Nodemon package to be able to restart Express server automatically when we change files.
For this we can start the app using:
    > npm start

# Further reading
For examples of better structured and more readable async calls for rest api projects, 
we may read below medium tutos:
- How to Build NodeJS REST API with Express and MongoDB -- `https://medium.com/bb-tutorials-and-thoughts/how-to-build-nodejs-rest-api-with-express-and-mongodb-fa6e1610ee1b`
- How to Build NodeJS REST API with Express and MongoDB — Typescript Version -- `https://medium.com/bb-tutorials-and-thoughts/how-to-build-nodejs-rest-api-with-express-and-mongodb-typescript-version-38f4492920ee`

These projects also expost API docs using swagger node modules as a dependency