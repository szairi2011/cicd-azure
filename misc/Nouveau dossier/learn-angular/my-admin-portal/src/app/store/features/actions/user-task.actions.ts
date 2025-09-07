import { createAction, props } from '@ngrx/store';

export const loadUserTasks = createAction(
  '[UserTask] Load UserTasks'
);

export const loadUserTasksSuccess = createAction(
  '[UserTask] Load UserTasks Success',
  props<{ data: any }>()
);

export const loadUserTasksFailure = createAction(
  '[UserTask] Load UserTasks Failure',
  props<{ error: any }>()
);
