import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.css']
})
export class MessageNewComponent implements OnInit {

  isLinear: boolean;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  priorities = ['Low', 'Medium', 'High'];

  departments = [
    {
      id: 1,
      name: 'HR'
    },
    {
      id: 2,
      name: 'Compensation',
    },
    {
      id: 3,
      name: 'Engineering',
    },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      emailCtrl: ['', Validators.compose([
        Validators.email,
        Validators.required
      ])],
      priorityCtrl: ['', Validators.compose([ Validators.required ])],
      departmentCtrl: ['', Validators.compose([ Validators.required ])]
    });

    this.secondFormGroup = this.formBuilder.group({
      messageCtrl: ['', Validators.required ]
    });
  }

}
