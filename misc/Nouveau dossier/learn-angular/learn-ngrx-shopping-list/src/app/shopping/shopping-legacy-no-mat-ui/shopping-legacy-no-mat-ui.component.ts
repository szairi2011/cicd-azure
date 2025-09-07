import { selectAllShoppingItems, selectShoppingLoading, selectShoppingError } from './../../store/selectors/shopping.selectors';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { ShoppingItem } from 'src/app/store/models/shopping-item.model';
import { AppState } from 'src/app/store/states/app.state';
import { AddShoppingItemAction, DeleteShoppingItemAction, LoadShoppingItemsAction } from 'src/app/store/actions/shopping.actions';

@Component({
  selector: 'app-shopping-legacy-no-mat-ui',
  templateUrl: './shopping-legacy-no-mat-ui.component.html',
  styleUrls: ['./shopping-legacy-no-mat-ui.component.scss']
})
export class ShoppingLegacyNoMatUiComponent implements OnInit {

  shoppingItems$: Observable<ShoppingItem[]>;
  loading$: Observable<boolean>
  error$: Observable<Error>

  newShoppingItem: ShoppingItem = {id: '', name:'', description: ''};

  constructor( private store:Store<AppState> ) {}

  ngOnInit(): void {
    this.shoppingItems$ = this.store.select(selectAllShoppingItems);
    this.loading$ = this.store.select(selectShoppingLoading);
    this.error$ = this.store.select(selectShoppingError);

    this.store.dispatch(new LoadShoppingItemsAction);
  }

  addItem() {
    this.newShoppingItem.id = uuid();

    this.store.dispatch(new AddShoppingItemAction(this.newShoppingItem));

    this.newShoppingItem = {
      id: '',
      name: '',
      description: ''
    }
  }

  deleteItem(id) {
    this.store.dispatch(new DeleteShoppingItemAction(id))
  }

}
