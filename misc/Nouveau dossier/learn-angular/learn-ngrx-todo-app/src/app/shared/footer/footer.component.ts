import { ToDo } from '../../to-do/entities';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() todos: ToDo[];

  constructor() { }

  ngOnInit(): void {
  }

}
