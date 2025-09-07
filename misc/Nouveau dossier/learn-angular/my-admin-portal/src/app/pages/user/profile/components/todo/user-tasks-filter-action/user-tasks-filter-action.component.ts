import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-tasks-filter-action',
  templateUrl: './user-tasks-filter-action.component.html',
  styleUrls: ['./user-tasks-filter-action.component.scss']
})
export class UserTasksFilterActionComponent implements OnInit {

  @Output() userTaskFilterEvent: EventEmitter<string> = new EventEmitter<string>();

  isShowInput: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  filterTasks(filterStr: string) {
    this.userTaskFilterEvent.emit(filterStr);
  }

  toggleInput() {
    this.isShowInput = !this.isShowInput;
  }

}
