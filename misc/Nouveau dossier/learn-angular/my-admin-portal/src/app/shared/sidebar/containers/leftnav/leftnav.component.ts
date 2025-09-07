import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/consts';

@Component({
  selector: 'app-leftnav',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LeftnavComponent implements OnInit {

  routes = routes;

  constructor() { }

  ngOnInit(): void {
  }

}
