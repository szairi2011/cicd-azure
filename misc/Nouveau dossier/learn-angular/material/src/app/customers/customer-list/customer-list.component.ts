import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  // Define the column order in the table
  displayedColumns: string[] = ['id2', 'name', 'gender', 'status', 'address'];

  customers: Customer[] = [
    {
      id: 1,
      name: "John Doe",
      address: "21, rue de la commission, 1001, Tuni, Tunsie",
      status: "maried",
      gender: "male"
    },
    {
      id: 1,
      name: "John Doe",
      address: "21, rue de la commission, 1001, Tuni, Tunsie",
      status: "maried",
      gender: "male"
    },
    {
      id: 1,
      name: "John Doe",
      address: "21, rue de la commission, 1001, Tuni, Tunsie",
      status: "maried",
      gender: "male"
    },
    {
      id: 1,
      name: "John Doe",
      address: "21, rue de la commission, 1001, Tuni, Tunsie",
      status: "maried",
      gender: "male"
    },
    {
      id: 1,
      name: "John Doe",
      address: "21, rue de la commission, 1001, Tuni, Tunsie",
      status: "maried",
      gender: "male"
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Customer {
    id: number;
    name: string;
    address: string;
    status: string;
    gender: string
}
