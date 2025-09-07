import { Email } from './../../../../pages/auth/models';
import { Component, Input, OnInit } from '@angular/core';
import { colors } from 'src/app/consts';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  @Input() emails: Email[];

  colors: string[] = [
    'yellow',
    'green',
    'pink',
    'blue'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
