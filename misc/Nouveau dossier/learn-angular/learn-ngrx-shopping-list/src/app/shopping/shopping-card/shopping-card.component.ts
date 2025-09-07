import { map } from 'rxjs/operators';
import { selectAllShoppingItems, selectShoppingDictionary, selectShoppingIds } from './../../store/selectors/shopping.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/states/app.state';
import { ShoppingItem } from 'src/app/store/models/shopping-item.model';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss']
})
export class ShoppingCardComponent implements OnInit {

  @Input('id') id: string | number;
  shoppingItem$: Observable<ShoppingItem>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.shoppingItem$ = this.store.select(selectShoppingDictionary).pipe(
      map(dict => dict[this.id])
    );
  }

}
