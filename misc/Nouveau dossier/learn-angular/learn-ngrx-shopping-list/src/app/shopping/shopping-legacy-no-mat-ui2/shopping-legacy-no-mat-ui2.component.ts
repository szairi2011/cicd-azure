import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import { ShoppingItem } from 'src/app/store/models/shopping-item.model';
import { AppState } from 'src/app/store/states/app.state';
import { AddShoppingItemAction, DeleteShoppingItemAction, LoadShoppingItemsAction } from 'src/app/store/actions/shopping.actions';

@Component({
  selector: 'app-root-2',
  templateUrl: './shopping-legacy-no-mat-ui2.component.html',
  styleUrls: ['./shopping-legacy-no-mat-ui2.component.scss']
})
export class ShoppingLegacyNoMatUi2Component implements OnInit {

  shoppingItems$: Observable<ShoppingItem[]>;
  loading$: Observable<boolean>
  error$: Observable<Error>

  newShoppingItem: ShoppingItem = {id: '', name:'', description: ''};

  constructor( private store:Store<AppState> ) {}

  ngOnInit(): void {
    this.shoppingItems$ = this.store.select(state => state.shopping.list);
    this.loading$ = this.store.select(state => state.shopping.loading);
    this.error$ = this.store.select(state => state.shopping.error);

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
