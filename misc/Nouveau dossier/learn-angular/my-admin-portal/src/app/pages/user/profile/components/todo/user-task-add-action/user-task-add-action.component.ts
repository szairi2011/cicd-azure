import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { AddUserTaskComponent } from '../crud';

@Component({
  selector: 'app-user-task-add-action',
  templateUrl: './user-task-add-action.component.html',
  styleUrls: ['./user-task-add-action.component.scss']
})
export class UserTaskAddActionComponent implements OnInit {

  constructor(private matDialog: MatDialog ) { }

  ngOnInit(): void {

  }

  addTask() {
    const _dialogRef = this.matDialog.open(AddUserTaskComponent, {
      width: '500px',
      height: '300px',
      data: {}
    });

    _dialogRef.afterClosed().subscribe(
      result => console.log("Creating a new user task ...")
    );
  }

}
