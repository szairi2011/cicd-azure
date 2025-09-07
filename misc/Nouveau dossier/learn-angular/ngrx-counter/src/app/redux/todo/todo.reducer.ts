import { add } from './todo.actions';

import { createReducer } from '@ngrx/store';

const initialToDoState = [];

// const _createTodoReducer = createReducer(
//   initialToDoState,
//   on(add, (state, todo) => {
//     [...state,  ]);
//   }
// )
