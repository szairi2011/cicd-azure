import { Observable } from 'rxjs';
import { Product, AppState } from './../../redux/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private store: Store<AppState>) {
    this.products = this.store.select(state => state.products);
  }

  ngOnInit(): void {
  }

}
