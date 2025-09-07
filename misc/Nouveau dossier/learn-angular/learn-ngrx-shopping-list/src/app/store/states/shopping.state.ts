import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { ShoppingItem } from './../models/shopping-item.model';

export interface ShoppingState extends EntityState<ShoppingItem> {
  list: ShoppingItem[];
  loading: boolean;
  error: Error;
  total?: number;
}

export const shoppingItemAdapter: EntityAdapter<ShoppingItem> = createEntityAdapter({
  selectId: (item: ShoppingItem) => item.id
});

export const initialShoppingState = shoppingItemAdapter.getInitialState({
  list: [],
  loading: false,
  error: undefined,
  total: 0
});
