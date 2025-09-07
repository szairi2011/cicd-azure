const backendUrl = 'http://localhost:3001';

async function fetchTodos() {
    try {
        const response = await fetch(`${backendUrl}/todos`);
        const todos = await response.json();
        console.log("Fetched todos from the backend server", todos);
        updateTodos(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

function updateTodos(todos) {
    const todoList = document.getElementById('todo-list');
    console.log('Updating todos:', todos);
    if (!todoList) {
        console.error('todo-list element not found');
        return;
    }

    // Clear existing todos
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }

    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = `todo-item ${todo.completed ? 'completed' : 'pending'}`;
        todoItem.dataset.id = todo.id;
        todoItem.innerHTML = `
            <span>${todo.task}</span>
            <div>
                <button>${todo.completed ? 'Mark as Pending' : 'Mark as Completed'}</button>
                <button>Delete</button>
            </div>
        `;

        const updateButton = todoItem.querySelector('button:first-child');
        updateButton.addEventListener('click', () => {
            todo.completed = !todo.completed;
            console.log('Updated todo with status:', todo.completed);
            updateTodo(todo.id, todo.completed);
        });

        const deleteButton = todoItem.querySelector('button:last-child');
        deleteButton.addEventListener('click', () => {
            deleteTodo(todo.id);
        });

        todoItem.addEventListener('click', () => {
            if (!todoItem.classList.contains('selected')) {
                todoItem.classList.add('selected');
            }
        });

        todoList.appendChild(todoItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    if (todoList) {
        fetchTodos();
    } else {
        console.error('todo-list element not found');
    }
    document.getElementById('add-todo').addEventListener('click', addTodo);
});

async function addTodo() {
    const taskInput = document.getElementById('new-todo');
    const task = taskInput.value;

    console.log('Adding todo:', { task, completed: false });

    try {
        const response = await fetch(`${backendUrl}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task, completed: false })
        });

        if (response.ok) {
            fetchTodos();
            taskInput.value = '';
        } else {
            console.error('Error adding todo:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding todo:', error);
    }
}

async function updateTodo(id, completed) {
    console.log(`Updating todo ${id} with completed status: ${completed}`);
    try {
        const response = await fetch(`${backendUrl}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed })
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            console.log('Response status:', response.status);
            console.log('Updated todo:', updatedTodo);
            updateTodos([updatedTodo]);
        } else {
            console.error('Error updating todo:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

async function deleteTodo(id) {
    try {
        const response = await fetch(`${backendUrl}/todos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchTodos();
        } else {
            console.error('Error deleting todo:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}

document.getElementById('delete-selected').addEventListener('click', () => {
    const selectedItem = document.querySelector('.todo-item.selected');
    if (selectedItem) {
        const todoId = selectedItem.dataset.id; // Ensure the correct ID is passed
        deleteTodo(todoId);
    }
});
