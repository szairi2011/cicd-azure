import { Component, OnInit } from '@angular/core';

interface TodoItem {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})
export class TodoListsComponent implements OnInit {
  showForm = false;
  todoItems: TodoItem[] = [
    { title: 'Complete the dashboard design', completed: false },
    { title: 'Set up the project structure', completed: true },
    { title: 'Implement todo list functionality', completed: false }
  ];

  newTodoTitle = '';
  newTodoDescription = '';

  constructor() { }

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }

  toggleComplete(todo: TodoItem): void {
    todo.completed = !todo.completed;
  }

  saveTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoItems.push({
        title: this.newTodoTitle,
        completed: false
      });
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.showForm = false;
    }
  }
}
