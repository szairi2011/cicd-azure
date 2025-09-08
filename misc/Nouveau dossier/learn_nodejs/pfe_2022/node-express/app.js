var express = require('express');
var app = express();
var request = require('request');
var graphRoute =require('./routes/graphRoute');
var userRoute =require('./routes/userRoute');
const cors = require('cors');
app.use(cors());

var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/graph',graphRoute);
app.use('/user',userRoute);



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
