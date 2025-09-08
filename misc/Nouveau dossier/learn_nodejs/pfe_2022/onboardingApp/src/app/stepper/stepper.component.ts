import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  name: string;
  invitation: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {invitation: "accepted", name: 'Hydrogen', },
  {invitation: "pending", name: 'Helium',},
 ];


@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent  {
  displayedColumns: string[] = ['invitation', 'name'];
  dataSource = ELEMENT_DATA;
}