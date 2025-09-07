// Copied from https://github.com/oopcoders/NGRX-Course/blob/master/server/generate.js
var faker = require("faker");
var uuid = require("uuid");

var database = {
  tasks: [],
  users: [],
  categories: [],
  carts: [],
};

for (var i = 1; i <= 10; i++) {
  database.tasks.push({
    id: uuid(),
    title: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    group: '',
    time: '10:34am',
    isComplete: faker.random.boolean()
  });
}

for (var i = 1; i <= 10; i++) {
  let user = {
    id: uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    username: '',
    email: '',
    company: 'FIS',
    role: faker.name.jobTitle(),
    skills: [
        faker.name.jobArea(),
        faker.name.jobArea(),
        faker.name.jobArea(),
        faker.name.jobArea()
    ]
  };
  user.username = user.firstname.toLowerCase() + '.' + user.lastname.toLowerCase() + '@' + 'fisglobal' + '.com';
  user.email = user.username;
  database.users.push(user)
}

for (var i = 1; i <= 50; i++) {
  database.categories.push({
    id: i,
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
  });
}

database.carts.push({
  id: 1,
  userid: 2,
  products: [],
});

database.carts.push({
  id: 2,
  userid: 1,
  products: [],
});

console.log(JSON.stringify(database));
