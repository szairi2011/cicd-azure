import { Update } from '@ngrx/entity';
import { UpdateShoppingItemAction } from './../../../store/actions/shopping.actions';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/store/states/app.state';
import { Store } from '@ngrx/store';
import { ShoppingItem } from './../../../store/models/shopping-item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-update-shopping-item-dialog',
  templateUrl: './update-shopping-item-dialog.component.html',
  styleUrls: ['./update-shopping-item-dialog.component.scss']
})
export class UpdateShoppingItemDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateShoppingItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingItem,
    private store: Store<AppState>  ) { }

  formControl = new FormControl('', [
    Validators.required
  ])

  itemToBeUpdated: ShoppingItem = new ShoppingItem();

  ngOnInit(): void {
    this.itemToBeUpdated = Object.assign(this.itemToBeUpdated, this.data);
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

    console.log('submit() is reached')

    const update: Update<ShoppingItem> = {
      id: this.data.id,
      changes: {
        ...this.itemToBeUpdated,
        ...this.data
        // ...{
        //   description: this.data.description
        // }
      }
    };

    this.store.dispatch( new UpdateShoppingItemAction(update));

    this.data = {
      id: '',
      name: '',
      description: ''
    }
  }

}
