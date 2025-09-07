import { LoadShoppingItemsAction, ShoppingActionTypes, LoadShoppingItemsSuccessAction, LoadShoppingItemsFailureAction, AddShoppingItemAction, AddShoppingItemSuccessAction, AddShoppingItemFailureAction, DeleteShoppingItemAction, DeleteShoppingItemSuccessAction, DeleteShoppingItemFailureAction, UpdateShoppingItemAction, UpdateShoppingItemSuccessAction, UpdateShoppingItemFailureAction } from './../actions/shopping.actions';
import { ShoppingService } from './../../shopping.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Injectable()
export class ShoppingEffects {

  loadShoppingItems$ = createEffect(
    () => this.actions$.pipe(
        ofType<LoadShoppingItemsAction>(ShoppingActionTypes.LOAD_SHOPPING_ITEMS),
        mergeMap(
          () => this.shoppingService.loadShppingItems()
            .pipe(
              map(data => new LoadShoppingItemsSuccessAction(data)),
              catchError(error => of(new LoadShoppingItemsFailureAction(error)))
            )
        )
      )
  );

  addShoppingItem$ = createEffect(
    () => this.actions$.pipe(
        ofType<AddShoppingItemAction>(ShoppingActionTypes.ADD_ITEM),
        mergeMap(
          (data) => this.shoppingService.addItem(data.payload)
            .pipe(
              map(() => new AddShoppingItemSuccessAction(data.payload)),
              catchError(error => of(new AddShoppingItemFailureAction(error)))
            )
        )
      )
  );

  updateShoppingItem$ = createEffect(
    () => this.actions$.pipe(
        ofType<UpdateShoppingItemAction>(ShoppingActionTypes.UPDATE_ITEM),
        mergeMap(
          (data) => this.shoppingService.updateItem(data.payload.id, data.payload.changes)
            .pipe(
              map(() => new UpdateShoppingItemSuccessAction(data.payload)),
              catchError(error => of(new UpdateShoppingItemFailureAction(error)))
            )
        )
      )
  );

  deleteShoppingItem$ = createEffect(
    () => this.actions$.pipe(
        ofType<DeleteShoppingItemAction>(ShoppingActionTypes.DELETE_ITEM),
        mergeMap(
          (data) => this.shoppingService.deleteItem(data.payload)
            .pipe(
              map(() => new DeleteShoppingItemSuccessAction(data.payload)),
              catchError(error => of(new DeleteShoppingItemFailureAction(error)))
            )
        )
      )
  );


  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService) {}

}
