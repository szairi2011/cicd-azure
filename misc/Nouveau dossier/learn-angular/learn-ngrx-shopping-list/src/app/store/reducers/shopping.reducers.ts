import { shoppingItemAdapter, initialShoppingState } from './../states/shopping.state';
import { ShoppingAction, ShoppingActionTypes } from './../actions/shopping.actions';

const initialState = initialShoppingState ;

export function ShoppingReducer( state = initialState, action: ShoppingAction) {
  switch(action.type) {
    case ShoppingActionTypes.LOAD_SHOPPING_ITEMS:
      return {
        ... state,
        loading: true
      };
    case ShoppingActionTypes.LOAD_SHOPPING_ITEMS_SUCCESS:
      return shoppingItemAdapter.addMany(action.payload, {
        ... state,
        // list: action.payload,
        loading: false,
      });
    case ShoppingActionTypes.LOAD_SHOPPING_ITEMS_FAILURE:
      return shoppingItemAdapter.removeAll({
        ... state,
        loading: false,
        error: action.payload
      });

    case ShoppingActionTypes.ADD_ITEM:
      return {
        ... state,
        loading: true
      };

    case ShoppingActionTypes.ADD_ITEM_SUCCESS:
      return shoppingItemAdapter.addOne(action.payload, {
        ... state,
        // list: [... state.list, action.payload],
        loading: false
      });

    case ShoppingActionTypes.ADD_ITEM_FAILURE:
      return {
        ... state,
        loading: false,
        error: action.payload
      };

    case ShoppingActionTypes.UPDATE_ITEM:
      return {
        ...state,
        loading: true
      };

    case ShoppingActionTypes.UPDATE_ITEM_SUCCESS:
      return shoppingItemAdapter.updateOne(action.payload, {
        ...state,
        loading: false
      });

    case ShoppingActionTypes.UPDATE_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ShoppingActionTypes.DELETE_ITEM:
      return {
        ... state,
        loading: true
      };

    case ShoppingActionTypes.DELETE_ITEM_SUCCESS:
      return shoppingItemAdapter.removeOne(action.payload, {
        ... state,
        loading: false
      });

    case ShoppingActionTypes.DELETE_ITEM_FAILURE:
      return {
        ... state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
