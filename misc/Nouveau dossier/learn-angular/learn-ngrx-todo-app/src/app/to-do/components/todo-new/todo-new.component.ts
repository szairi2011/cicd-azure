import { ToDo } from '../../entities';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { inherits } from 'util';

@Component({
  selector: 'app-todo-new',
  templateUrl: './todo-new.component.html',
  styleUrls: ['./todo-new.component.scss']
})
export class TodoComponent implements OnInit {

  newTodo: ToDo = this.init();

  @Output() add: EventEmitter<ToDo> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  addTodo(): void {
    this.add.emit(this.newTodo);
    this.newTodo = this.init();
  }

  init(): ToDo {

    var _values = {
      isComplete: false,
      description: ""
    }

    return new ToDo(_values);
  }

}
