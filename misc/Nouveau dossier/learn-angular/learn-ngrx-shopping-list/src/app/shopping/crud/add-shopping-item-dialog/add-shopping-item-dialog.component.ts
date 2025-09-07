import { AddShoppingItemAction } from '../../../store/actions/shopping.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { ShoppingItem } from '../../../store/models/shopping-item.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuid } from 'uuid';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-item-add',
  templateUrl: './shopping-item-add.component.html',
  styleUrls: ['./shopping-item-add.component.scss']
})
export class AddShoppingItemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddShoppingItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingItem,
    private store: Store<AppState>  ) { }

  formControl = new FormControl('', [
    Validators.required
  ])

  ngOnInit(): void {
    this.data.id = uuid();
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  onCancel() {
    this.dialogRef.close();
  }

  submit() {


    this.store.dispatch(new AddShoppingItemAction(this.data));

    this.data = {
      id: '',
      name: '',
      description: '',
    }
  }

}
