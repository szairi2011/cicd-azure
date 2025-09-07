import { map } from 'rxjs/operators';
import { ToDo } from '../../entities';
import { TodoService } from '../../services';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo-page',
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss']
})
export class ToDoPageComponent implements OnInit {

  todos: ToDo[] = [];

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todoService.getAllTodos()
      .subscribe(
        (todos) => {
          this.todos = todos.map(todo => Object.assign(new ToDo(), todo));
        }
      );
     /*
    this.route.data.pipe(
      map((data) => data['todos'])
    ).subscribe(
          (todos) => {
            this.todos = todos.map(todo => Object.assign(new ToDo(), todo))
          }
        )
      */

    // Try the reduce pattern
    function counter(count:number, action: string) {
      switch(action) {
        case "INCREMENT":
          return ++count;
        case "DECREMENT":
          return --count;

      }
    };

    const actions = ["INCREMENT", "INCREMENT", "DECREMENT", "INCREMENT"];
    console.log("The actions counter: " + actions.reduce(counter, 0)); // result = 2


  }



  toggleToDoCompleteChange(todo: ToDo): void {
    // console.log("Caught the toggleStatus event from todo-page", todo);
    todo.isComplete = !todo.isComplete;
    this.todoService.toggleTodoStatus(todo)
      .subscribe(
        (updated_todo) => {
          todo = Object.assign(new ToDo(), updated_todo);
        }
      );
  }

  deleteToDo(todo: ToDo): void {
    // console.log("Caught the removeToDo event from todo-page");
    this.todoService.deleteTodo(todo)
      .subscribe(
        () => {
          this.todos = this.todos.filter(item => todo.id !== item.id);
          // Might be better to call getAllTodo() instead
        }
      );
  }

  addToDo(todo: ToDo): void {
    this.todoService.addToDo(todo)
    .subscribe(
      (newTodo) => {
        this.todos.push(Object.assign(new ToDo(), newTodo));
      }
    );
  }

}
