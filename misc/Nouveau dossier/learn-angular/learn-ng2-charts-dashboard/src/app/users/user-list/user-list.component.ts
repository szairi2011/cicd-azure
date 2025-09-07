import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements AfterViewInit, OnInit {

  displayedColumns = ['id', 'firstname', 'lastname', 'role', 'company', 'email', 'status'];

  usersList: User[] = [
    {
      id: 1,
      firstname: 'Kara',
      lastname: 'Bowman',
      company: 'FIS',
      role: 'Developer',
      status: 'active',
      email: 'kara.bowman@fis.com'
    },
    {
      id: 2,
      firstname: 'Kara',
      lastname: 'Bowman',
      company: 'FIS',
      role: 'Developer',
      status: 'active',
      email: 'kara.bowman@fis.com'
    },
    {
      id: 3,
      firstname: 'Kara',
      lastname: 'Bowman',
      company: 'FIS',
      role: 'Developer',
      status: 'active',
      email: 'kara.bowman@fis.com'
    },
    {
      id: 4,
      firstname: 'Kara',
      lastname: 'Bowman',
      company: 'FIS',
      role: 'Developer',
      status: 'active',
      email: 'kara.bowman@fis.com'
    },
    {
      id: 5,
      firstname: 'Kara',
      lastname: 'Bowman',
      company: 'FIS',
      role: 'Developer',
      status: 'active',
      email: 'kara.bowman@fis.com'
    },
    {
      id: 6,
      firstname: 'Kara',
      lastname: 'Bowman',
      company: 'FIS',
      role: 'Developer',
      status: 'active',
      email: 'kara.bowman@fis.com'
    }
  ];

  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  dataSource: MatTableDataSource<User>;


  constructor() {}

  @ViewChild( MatPaginator ) paginator: MatPaginator;
  @ViewChild( MatSort ) sort: MatSort;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.usersList);

    // this.store.select(selectAllShoppingItems).pipe(
    //   map((items) => this.shoppingList = items)
    // ).subscribe(() => this.dataSource.data = this.shoppingList);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterStr: string) {
    filterStr = filterStr.trim();
    filterStr = filterStr.toLowerCase(); // MatTableDataSource filtering defaults to ower case comparison
    this.dataSource.filter = filterStr;
  }

}

export interface User {
  id: string | number;
  firstname: string;
  lastname: string;
  role: string;
  company: string;
  email: string;
  status: string;
}
