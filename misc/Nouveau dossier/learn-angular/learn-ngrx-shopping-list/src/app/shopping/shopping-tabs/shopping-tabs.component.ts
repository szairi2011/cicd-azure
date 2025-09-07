import { delay, map } from 'rxjs/operators';
import { selectAllShoppingItems } from './../../store/selectors/shopping.selectors';
import { ShoppingItem } from 'src/app/store/models/shopping-item.model';
import { LoadShoppingItemsAction } from './../../store/actions/shopping.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-tabs',
  templateUrl: './shopping-tabs.component.html',
  styleUrls: ['./shopping-tabs.component.scss']
})
export class ShoppingTabsComponent implements OnInit {

availableItems$: Observable<ShoppingItem[]>;
favoriteItems$: Observable<ShoppingItem[]>;
purchasedItems$: Observable<ShoppingItem[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new LoadShoppingItemsAction());

    this.availableItems$ = this.store.select(selectAllShoppingItems).pipe(
      // delay(2000)
    );

    this.favoriteItems$ = this.store.select(selectAllShoppingItems).pipe(
      map(items => items.filter(item => item.isFavorite == "true"))
    )

    this.purchasedItems$ = this.store.select(selectAllShoppingItems).pipe(
      map(items => items.filter(item => item.isPurchased == "true"))
    )
  }

}
