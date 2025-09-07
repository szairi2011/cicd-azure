var faker = require('faker');
// var utf8 = require('utf8');
var fs = require('fs');

var db = { todos: [] };

for (var i=1; i<=10; i++) {
  db.todos.push({
    id: i,
    title: faker.random.words(),
    description: faker.lorem.words(),
    isComplete: faker.random.boolean(),
    // rating: Math.floor(Math.random()*100+1)/10
  });
}

fs.writeFileSync('db.json', JSON.stringify(db, null, 2), 'utf8');

// The following line had an encoding issue so switched to use fs to write to file system in UTF-8 encoding as expected
// by json-server module
// console.log(utf8.encode(JSON.stringify(db, null, 2)));
