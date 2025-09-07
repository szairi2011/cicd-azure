import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserTask from '../reducers/user-task.reducer';

export const selectUserTaskState = createFeatureSelector<fromUserTask.State>(
  fromUserTask.userTaskFeatureKey
);
