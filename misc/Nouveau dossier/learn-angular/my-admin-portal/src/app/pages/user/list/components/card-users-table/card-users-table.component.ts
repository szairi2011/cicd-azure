import { map } from 'rxjs/operators';
import { selectAllUsers } from 'src/app/store/selectors/user-info.selectors';
import { UserInfo } from 'src/app/store/models';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { loadAllUsers } from 'src/app/store/actions';

@Component({
  selector: 'app-card-users-table',
  templateUrl: './card-users-table.component.html',
  styleUrls: ['./card-users-table.component.scss']
})
export class CardUsersTableComponent implements OnInit, AfterViewInit {

  // displayedColumns = ['id', 'name', 'role', 'company', 'email', 'status', 'created', 'ACTIONS'];
  displayedColumns = ['id', 'name'];

  users: UserInfo[];

  usersDS: MatTableDataSource<UserInfo>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.usersDS = new MatTableDataSource<UserInfo>(this.users);

    // this.store.dispatch(loadAllUsers());

    this.store.select(selectAllUsers).pipe(
      map((items) => {
        this.users = items;
        console.log("CardUsersTableComponent :: Returning users list length: ", this.users.length);
      })
    ).subscribe(() => this.usersDS.data = this.users);
  }

  ngAfterViewInit(): void {
    // setTimeou

  }



}
