import { Observable } from 'rxjs';
import { Product, AppState } from './../../redux/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.products = this.store.select(state => state.products);
  }

  ngOnInit(): void {
  }

  addProduct(name, price) {
    this.store.dispatch(
      {
        type: 'ADD_PRODUCT',
        payload: <Product> {
          name: name,
          price: price
        }
      }
    )
  }

}
