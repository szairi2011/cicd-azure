
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UserTask } from 'src/app/store/models';
import * as uuid from 'uuid';
import { AppState } from 'src/app/store';
import * as UserTaskActions from 'src/app/store/actions'

@Component({
  selector: 'app-add-user-task',
  templateUrl: './add-user-task.component.html',
  styleUrls: ['./add-user-task.component.scss']
})
export class AddUserTaskComponent implements OnInit {

  task: UserTask = {} as UserTask;

  addTaskForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<UserTask>,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.addTaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(500)],
    })
  }

  // Initialize a new task on submission
  addTask() {
    this.task.id = uuid() as string;
    this.task.title = this.addTaskForm.controls.title.value;
    this.task.description = this.addTaskForm.controls.description.value;

    const _today = new Date();
    this.task.time = _today.getHours() + ':' + _today.getMinutes();

    this.task.isComplete = false

    this.store.dispatch(UserTaskActions.addUserTask({
      userTask: this.task
    }))
  }

  // Cancel new user task submission
  cancel() {
    this.dialogRef.close({dialogResult: 0});
  }

}
