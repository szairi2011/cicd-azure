var express = require('express');
var faker = require('faker');
var app = express();


app.get('/random-user', function(req, res) {
    var user = faker.helpers.createCard()
    res.json(user);
});


app.listen(3000, function(){
  console.log('listening on port 3000');
})