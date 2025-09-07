import { ToDo } from '../../entities';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: ToDo[];

  @Output() toggleTodoStatus: EventEmitter<ToDo> = new EventEmitter();

  @Output() removeToDo: EventEmitter<ToDo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  toggleToDoCompleteChange(todo: ToDo): void {
    // console.log("Caught the toggleStatus event from todo-list", todo);
    this.toggleTodoStatus.emit(todo);
  }

  deleteToDo(todo: ToDo): void {
    // console.log("Caught the removeToDo event from todo-list");
    this.removeToDo.emit(todo);
  }

}
