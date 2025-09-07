import { ShoppingItem } from './../models/shopping-item.model';
import { Action, createAction, props } from "@ngrx/store";
import { Update } from '@ngrx/entity';


export enum ShoppingActionTypes {
  LOAD_SHOPPING_ITEMS = '[SHOPPING] Load Shopping Items',
  LOAD_SHOPPING_ITEMS_SUCCESS = '[SHOPPING] Load Shopping Items Success',
  LOAD_SHOPPING_ITEMS_FAILURE = '[SHOPPING] Load Shopping Items Failure',
  ADD_ITEM = '[SHOPPING] Add Item',
  ADD_ITEM_SUCCESS = '[SHOPPING] Add Item Success',
  ADD_ITEM_FAILURE = '[SHOPPING] Add Item Failure',
  UPDATE_ITEM = '[SHOPPING] Update Item',
  UPDATE_ITEM_SUCCESS = '[SHOPPING] Update Item Success',
  UPDATE_ITEM_FAILURE = '[SHOPPING] Update Item Failure',
  DELETE_ITEM = "[SHOPPING] Delete Item",
  DELETE_ITEM_SUCCESS = "[SHOPPING] Delete Item Success",
  DELETE_ITEM_FAILURE = "[SHOPPING] Delete Item Failure"
}

// Load items actions
export class LoadShoppingItemsAction implements Action {
  readonly type = ShoppingActionTypes.LOAD_SHOPPING_ITEMS;
}

export class LoadShoppingItemsSuccessAction implements Action {
  readonly type = ShoppingActionTypes.LOAD_SHOPPING_ITEMS_SUCCESS;
  constructor( public payload: ShoppingItem[] ) {}
}

export class LoadShoppingItemsFailureAction implements Action {
  readonly type = ShoppingActionTypes.LOAD_SHOPPING_ITEMS_FAILURE;
  constructor( public payload: Error ) {}
}

// Add a shopping item actions
export class AddShoppingItemAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM;
  constructor(public payload: ShoppingItem) {}
}

export class AddShoppingItemSuccessAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM_SUCCESS;
  constructor(public payload: ShoppingItem) {}
}

export class AddShoppingItemFailureAction implements Action {
  readonly type = ShoppingActionTypes.ADD_ITEM_FAILURE;
  constructor(public payload: Error) {}
}

/* // Use action creator flavour to create the Update actions; it's quicker
export const updateShoppingItemAction = createAction(ShoppingActionTypes.UPDATE_ITEM, props<{item: ShoppingItem}>());
export const updateShoppingItemActionSuccess = createAction(ShoppingActionTypes.UPDATE_ITEM_SUCCESS, props<{item: ShoppingItem}>());
export const updateShoppingItemActionFailure = createAction(ShoppingActionTypes.UPDATE_ITEM_FAILURE, props<{error: Error}>()); */

export class UpdateShoppingItemAction implements Action {
  readonly type = ShoppingActionTypes.UPDATE_ITEM;
  constructor(public payload: Update<ShoppingItem>) {}
}

export class UpdateShoppingItemSuccessAction implements Action {
  readonly type = ShoppingActionTypes.UPDATE_ITEM_SUCCESS;
  constructor(public payload: Update<ShoppingItem>) {}
}

export class UpdateShoppingItemFailureAction implements Action {
  readonly type = ShoppingActionTypes.UPDATE_ITEM_FAILURE;
  constructor(public payload: Error) {}
}

// Delete actions
export class DeleteShoppingItemAction implements Action {
  readonly type = ShoppingActionTypes.DELETE_ITEM;
  constructor(public payload: string) {}
}

export class DeleteShoppingItemSuccessAction implements Action {
  readonly type = ShoppingActionTypes.DELETE_ITEM_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteShoppingItemFailureAction implements Action {
  readonly type = ShoppingActionTypes.DELETE_ITEM_FAILURE;
  constructor(public payload: Error) {}
}

export type ShoppingAction =
  LoadShoppingItemsAction |
  LoadShoppingItemsSuccessAction |
  LoadShoppingItemsFailureAction |
  AddShoppingItemAction |
  AddShoppingItemSuccessAction |
  AddShoppingItemFailureAction |
  UpdateShoppingItemAction |
  UpdateShoppingItemSuccessAction |
  UpdateShoppingItemFailureAction |
  DeleteShoppingItemAction |
  DeleteShoppingItemSuccessAction |
  DeleteShoppingItemFailureAction;
