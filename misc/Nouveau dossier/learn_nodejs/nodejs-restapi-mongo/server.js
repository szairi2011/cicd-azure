const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
require('dotenv').config();

const taskController = require('./controller/task.controller')



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/api/tasks', (req, res) => {
    taskController.getTasks()
        .then(data => res.json(data))
        .catch(err => {
            console.log('Error: ' + err);
            res.json(err);});
});

app.get('/api/task/:id', (req, res) => {
    taskController.getTask(req.params.id)
        .then(data => res.json(data))
        .catch(err => {
            console.log('Error: ' + err);
            res.json(err);});
})

app.post('/api/task', (req, res) => {
    console.log('Posted a new todo task: ' + req.body);
    taskController.createTask(req.body).then(data => res.json(data));
});

app.put('/api/task', (req, res) => {
    console.log('Updating todo task where _id: ' + req.body._id + '\n' + req.body);
    taskController.updateTask(req.body).then(data => res.json(data));
});

app.delete('/api/task/:id', (req, res) => {
    taskController.deleteTask(req.params.id).then(data => res.json(data));
});

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});



app.listen(port, () => {
    console.log(`Server listening on the port  ` + chalk.green(port));
})