import { ShoppingItem } from './store/models/shopping-item.model';
import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  shopping_url = environment.shopping_service_url;

  constructor(private http: HttpClient) { }

  loadShppingItems() {
    return this.http.get<ShoppingItem[]>(this.shopping_url)
    .pipe(
      delay(500)
    );
  }

  addItem(shoppingItem: ShoppingItem) {
    return this.http.post(this.shopping_url, shoppingItem)
    .pipe(
      delay(500)
    );
  }

  updateItem(id: string | number, changes: Partial<ShoppingItem>) {
    return this.http.put(`${this.shopping_url}/${id}`, changes);
  }

  deleteItem(id: string) {
   return this.http.delete(`${this.shopping_url}/${id}`)
    .pipe(
      delay(500)
    )
  }
}
