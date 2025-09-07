import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userTaskAdapter, userTasksFeatureKey, UserTaskState } from '../reducers';

// Get basic entity selectors first
const {
  selectIds: _selectIds,
  selectAll: _selectAll, // Returns an array of all UserTask items
  selectEntities: _selectEntities, // Returns a dictionary of {key, UserTask object}
  selectTotal: _selectTotal // Returns total number of items
} = userTaskAdapter.getSelectors();

const _userTaskFeatureSelector = createFeatureSelector<UserTaskState>(userTasksFeatureKey);

export const selectAllUserTasks = createSelector(
  _userTaskFeatureSelector,
  _selectAll
);

export const selectUserTasksDictionary = createSelector(
  _userTaskFeatureSelector,
  _selectEntities
);

export const selectTotalNumOfUserTasks = createSelector(
  _userTaskFeatureSelector,
  _selectTotal
);

export const selectUserTaskLoadingStatus = createSelector(
  _userTaskFeatureSelector,
  (state: UserTaskState) => state.loading
);

export const selectUserTaskError = createSelector(
  _userTaskFeatureSelector,
  (state: UserTaskState) => state.error
)
