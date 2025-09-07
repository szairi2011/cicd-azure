import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUserTask from './reducers/user-task.reducer';
import * as fromUserInfo from './reducers/user-info.reducer';

export interface AppState {

  [fromUserTask.userTasksFeatureKey]: fromUserTask.UserTaskState;

  [fromUserInfo.userInfoFeatureKey]: fromUserInfo.UserInfoState;

}

export const reducers: ActionReducerMap<AppState> = {

  [fromUserTask.userTasksFeatureKey]: fromUserTask.userTaskReducer,

  [fromUserInfo.userInfoFeatureKey]: fromUserInfo.userInfoReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
