

import { Store } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Update } from '@ngrx/entity';
import { UserTask } from 'src/app/store/models';
import { AppState } from 'src/app/store';
import { updateUserTask } from 'src/app/store/actions';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-user-task',
  templateUrl: './update-user-task.component.html',
  styleUrls: ['./update-user-task.component.scss']
})
export class UpdateUserTaskComponent implements OnInit {

  task: UserTask;

  updateForm: FormGroup;

  constructor(
      private dialogRef: MatDialogRef<UserTask>,
      @Inject(MAT_DIALOG_DATA) public data: UserTask,
      private store: Store<AppState>,
      private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    // Load original data prior to the update action
    this.task = this.data;

    this.updateForm = this.fb.group({
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.maxLength(500)]
    }
    );

  }

  // Update user task on submit
  update() {
    const toUpdate: Update<UserTask> = {
      id: this.task.id as string,
      changes: {
        title: this.updateForm.controls.title.value,
        description: this.updateForm.controls.description.value
      }
    }

    this.store.dispatch(updateUserTask( {userTask: toUpdate} ));

    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }


}
