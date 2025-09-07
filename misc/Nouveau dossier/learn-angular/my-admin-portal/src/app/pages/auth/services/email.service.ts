import { Email } from './../models/email';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  loadEmails(): Observable<Email[]> {
    // TODO: include backend call
    return of(
      [
        {name: 'John Duper', time: '10:45 am', message: 'Hi, need to restart the server ...'},
        {name: 'Anthony copolla', time: '11:12 pm', message: 'Hello, Please approve pending timesheets ...'},
        {name: 'John Duper', time: '8:23 am', message: 'Hi, Please finish any pendin tasks soon ...'},
        {name: 'John Duper', time: '9:12 pm', message: 'Hi, thank you for help ...'}
      ]
    );
  }
}
