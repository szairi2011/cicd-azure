const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const cors = require('cors');
const http = require('http');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

const fs = require('fs');
const path = require('path');

const todosFilePath = path.join(__dirname, 'todos.json');

let todos = [];

if (fs.existsSync(todosFilePath)) {
    todos = JSON.parse(fs.readFileSync(todosFilePath, 'utf8'));
} else {
    todos = [
        { id: 1, task: 'Buy groceries', completed: false },
        { id: 2, task: 'Walk the dog', completed: true },
        { id: 3, task: 'Read a book', completed: false }
    ];
}

// Save todos to file
function saveTodos() {
    fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2), 'utf8');
}

app.get('/todos', (req, res) => {
    res.json(todos);
    saveTodos();
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    console.log(`Received update request for todo ID ${id} with completed status ${completed}`);

    const todo = todos.find(todo => todo.id === parseInt(id));
    if (todo) {
        todo.completed = completed;
        console.log(`Updated todo ID ${id} with completed status ${completed}`);
        res.json(todo);
        saveTodos();
    } else {
        console.error(`Todo ID ${id} not found`);
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    const index = todos.findIndex(todo => todo.id === parseInt(id));
    if (index !== -1) {
        todos.splice(index, 1);
        res.status(204).send();
        saveTodos();
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.post('/todos', (req, res) => {
    const { task, completed } = req.body;
    const newTodo = {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        task,
        completed
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
    saveTodos();
});

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
