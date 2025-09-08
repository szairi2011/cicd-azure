/**
 * how to connect mongodb in node.js using mongoose ORM
 * MongoDB Resources : http://mongodb.org
 * Mongoose Resources : http://mongoosejs.com
 **/

// initialize mongoose
var mongoose = require("mongoose");

// connection mongoose to mongodb
// this just like odbc or jdbc
// in this case mongodb server at localhost
// you can change easy by replace localhost with your mongodb server
(async function mongo() {
  try {
    mongoose = await mongoose.connect("mongodb://localhost/todo-api");
    console.log('Established connection to database ...');
  }
  catch (error) {
    console.error('Problem occured when trying to connect to DB ...' + error);
  }
  return 
})();


// get mongodb schema
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

//create new Collection Schema
// if you new to mongodb, think Collection as database table
var TaskCollection = new Schema({
  title: String,
  description: String,
  createdBy: String,
  updatedBy: String,
  complete: Boolean | false
});

// mapping schema with model
var TodoModel = mongoose.model("todo", TaskCollection);

// insert a new todo
var todo = new TodoModel();
todo.title = "Example todo ...";
todo.description = "Todo example description ...";
todo.createdBy = 'Created by example ...';
todo.updatedBy = 'Updated by example ...';
todo.complete = false;

// save instance
todo.save(function (err) {
  if (!err) {
    console.log("Todo saved");
  } else {
    console.log("error while save todo, err : " + err);
  }
});
