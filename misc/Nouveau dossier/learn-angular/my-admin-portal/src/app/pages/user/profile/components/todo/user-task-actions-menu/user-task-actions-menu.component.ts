import { Update } from '@ngrx/entity';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { deleteUserTask, updateUserTask } from 'src/app/store/actions';
import { UserTask } from 'src/app/store/models';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserTaskComponent } from '../crud';

@Component({
  selector: 'app-user-task-actions-menu',
  templateUrl: './user-task-actions-menu.component.html',
  styleUrls: ['./user-task-actions-menu.component.scss']
})
export class UserTaskActionsMenuComponent implements OnInit {

  @Input() task: UserTask;

  constructor(
    private store: Store<AppState>,
    private editTaskDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  completeTask(t: UserTask) {
    const toggleComplete: Update<UserTask> = {
      id: this.task.id as string,
      changes: {isComplete: true}
    };

    this.store.dispatch( updateUserTask({ userTask: toggleComplete }) );
  }

  reactivateTask(task: UserTask) {
    const togglePending: Update<UserTask> = {
      id: task.id as string,
      changes: { isComplete: false }
    };

    this.store.dispatch( updateUserTask({userTask: togglePending}) )
  }

  edit(task: UserTask) {
    const _dialogRef = this.editTaskDialog.open(UpdateUserTaskComponent, {
      width: '500 px',
      height: '600 px',
      data: task
    });

    _dialogRef.afterClosed().subscribe(
      (result => {
        console.log("The dialog submission result: " + result)
        if (result == 1) {
          // We may add stuff here here when user submit the form
          console.log(`Updated user task where id: ${task.id}`)
        }
      })
    )

  }

  delete(_task: UserTask) {
    this.store.dispatch(deleteUserTask( {id: _task.id as string} ))
  }

}
