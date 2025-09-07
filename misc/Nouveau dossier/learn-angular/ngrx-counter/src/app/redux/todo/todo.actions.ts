import { createAction, props } from '@ngrx/store';

export const add = createAction(
  '[ToDo Component] Add',
  props<{payload: {title: string; isComplete: boolean;}}>()
  );
export const toogleComplete = createAction('[ToDo Component] ToggleComplete');
export const remove = createAction('[ToDo Component] Delete');
