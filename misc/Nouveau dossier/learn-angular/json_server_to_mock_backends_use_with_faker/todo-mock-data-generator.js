var faker = require('faker');
// var utf8 = require('utf8');
var fs = require('fs');


var db = { todos: [] };

for (var i=1; i<=1000; i++) {
  db.todos.push({
    id: i,
    title: faker.random.words(),
    isComplete: false,
    rating: Math.floor(Math.random()*100+1)/10
  });
}

fs.writeFileSync('todo-db.json', JSON.stringify(db, null, 0), 'utf8');

// The following line had an encoding issue so switched to use fs to write to file system in UTF-8 encoding as expected
// by json-server module
// console.log(utf8.encode(JSON.stringify(db, null, 2)));