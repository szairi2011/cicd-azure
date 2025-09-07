import { AppState } from './../states/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { shoppingItemAdapter, ShoppingState } from './../states/shopping.state';

// First Get basic selectors from the ngrx entiry adapter
export const {
  selectIds: _selectShoppingItemsIds,
  selectEntities: _selectShoppingItemsDictionary, //Returns a dictionary of (id, shopping item)
  selectAll: _selectShoppingItemsArray, // Returns an array of all items
  selectTotal: _selectShoppingItemsTotal // Return total number of items
} = shoppingItemAdapter.getSelectors();

export const selectShoppingState = createFeatureSelector<ShoppingState>('shopping');

export const selectShoppingIds = createSelector(
  selectShoppingState,
  _selectShoppingItemsIds
);

export const selectShoppingDictionary = createSelector(
  selectShoppingState,
  _selectShoppingItemsDictionary
);

export const selectAllShoppingItems = createSelector(
  selectShoppingState,
  _selectShoppingItemsArray
);

export const selectShoppingItemsNumber = createSelector(
  selectShoppingState,
  _selectShoppingItemsTotal
)

export const selectShoppingLoading = createSelector(
  selectShoppingState,
  (state: ShoppingState) => state.loading
);

export const selectShoppingError = createSelector(
  selectShoppingState,
  (state: ShoppingState) => state.error
)
