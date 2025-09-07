import { ToDo } from '../../entities';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {

  @Input() todo: ToDo;

  @Input() todo_idx: number;

  @Output() toggleTodoStatus: EventEmitter<ToDo> = new EventEmitter();

  @Output() removeToDo: EventEmitter<ToDo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  removeTodo(todo: ToDo): void {
    this.removeToDo.emit(todo);
    console.log("removeToDo event emitted from list item cmpt");
  }

  toggleStatus(todo: ToDo):void {
    this.toggleTodoStatus.emit(todo);
    console.log("toggleStatus event emitted from list item cmpnt", todo);
  }

}
