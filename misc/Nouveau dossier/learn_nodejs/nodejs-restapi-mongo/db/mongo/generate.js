// npm install faker@5.4.0
// - Initialize todo table by running below query from a bash command prompt:
// > mongo todo-api < ./db/mongo/tasksJson.js
var faker = require('faker');

var uuid = require("uuid");

var database = {
  tasks: [],
  // users: [],
  // categories: [],
  // carts: [],
};

for (var i = 1; i <= 10; i++) {
  // database.tasks.push({
  //   id: uuid.v4(),
  //   title: faker.commerce.productName(),
  //   description: faker.lorem.sentences(),
  //   done: faker.random.boolean(),
  //   time: '10:34am',
  //   isComplete: faker.random.boolean()
  // });

  let fullName = faker.name.firstName() + ' ' + faker.name.lastName();

  database.tasks.push({
    title: faker.commerce.productName(), 
    description: faker.lorem.sentences(), 
    // createDate: faker.date.recent(3), 
    // updatedDate: faker.date.recent(), 
    createdBy: fullName, 
    updatedBy: fullName,
    complete: faker.random.boolean()
  });
}

/* for (var i = 1; i <= 10; i++) {
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
}); */

// function mongo_init_generate() {
  console.log(`db.todo.insert(${JSON.stringify(database.tasks)});`);
// }

// console.log(JSON.stringify(database));


