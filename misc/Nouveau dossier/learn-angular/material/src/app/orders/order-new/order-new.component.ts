import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-new',
  templateUrl: './order-new.component.html',
  styleUrls: ['./order-new.component.css']
})
export class OrderNewComponent implements OnInit {

  form: FormGroup;
  currentYear = new Date().getFullYear();
  startDate: Date;

  constructor() {
    this.startDate = new Date(this.currentYear, 11, 4);
   }

  ngOnInit(): void {

    this.form = new FormGroup({
      simple_date: new FormControl('',
      [
        Validators.required,
        // this.dateValidator
      ])
    });
  }

  onSubmit(form: FormGroup): void {
    const simpleDate = form.controls.simple_date.value;
    console.log(simpleDate);
  }

  /*
  // Custom validation
  dateValidator(date: FormControl): object {
    if (date.value >= this.startDate) {
      return null;
    }
    else {
      return {
        error: 'Date is out of range'
      };
    }
  }
  */

}
