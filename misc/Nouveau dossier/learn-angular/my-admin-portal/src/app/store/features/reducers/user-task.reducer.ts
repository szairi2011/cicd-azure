import { Action, createReducer, on } from '@ngrx/store';
import * as UserTaskActions from '../actions/user-task.actions';

export const userTaskFeatureKey = 'userTask';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(UserTaskActions.loadUserTasks, state => state),
  on(UserTaskActions.loadUserTasksSuccess, (state, action) => state),
  on(UserTaskActions.loadUserTasksFailure, (state, action) => state),

);

