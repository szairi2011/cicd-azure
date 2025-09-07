import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  matForm1: FormGroup;

  constructor(private snackBar: MatSnackBar ) {}

  ngOnInit(): void {

    this.matForm1 = new FormGroup({
      emailFormCtrl: new FormControl('sofien.zairi', [Validators.required, Validators.email])
    });

  }

  // Testing Angular native template-drive form
  onSubmit(value): void {
    console.log(value);
  }

  onUndoSnackBar(): void {
    const undoSnackBarRef = this.snackBar.open('Customer saved', 'UNDO', {
      duration: 5000,
      horizontalPosition: 'end'
    });

    undoSnackBarRef.onAction().subscribe(
      () => {
        alert('Customer is undone ...');
      }
    )
  }

}
