import { MatHorizontalStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-add-user-form-stepper',
  templateUrl: './add-user-form-stepper.component.html',
  styleUrls: ['./add-user-form-stepper.component.scss'],

  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class AddUserFormStepperComponent implements OnInit {

  @Input('stepForms') stepForms: FormGroup[];

  @ViewChild('stepper') stepper: MatHorizontalStepper;

  constructor() { }

  ngOnInit(): void {

  }

}
