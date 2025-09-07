import { increment, decrement, reset } from './counter.actions';
import { createReducer, on } from "@ngrx/store";

const initialCounterState = 0;

const _counterReducer = createReducer(
  initialCounterState,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
