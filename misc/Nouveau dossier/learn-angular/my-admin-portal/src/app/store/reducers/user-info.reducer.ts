import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserInfo } from '../models/user-info.model';
import * as UserInfoActions from '../actions/user-info.actions';

export const userInfoFeatureKey = 'userInfo';

export interface UserInfoState extends EntityState<UserInfo> {
  loading?: boolean;
  isAuthenticated?: boolean;
  error?: Error;
  loggedInUser?: UserInfo
}

export const userInfoAdapter: EntityAdapter<UserInfo> = createEntityAdapter<UserInfo>();

export const userInfoInitialState: UserInfoState = userInfoAdapter.getInitialState({
  // additional entity state properties
});


export const userInfoReducer = createReducer(
  userInfoInitialState,

  // Add User rducers including success and failure
  on(UserInfoActions.addUserInfo,
    (state) => {
      return {
        ...state,
        loading: true
      }
    }
  ),

  on(UserInfoActions.addUserInfoSuccess,
    (state, action) => userInfoAdapter.addOne(action.userInfo,
      {
        ...state,
        loading: false
      })
  ),

  on(UserInfoActions.addUserInfoFailure,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  ),

  // Authenticate user actions including success and failure
  on(UserInfoActions.authenticateUserAction,
    (state) => {
      return {
        ...state,
        loading: true,
      }
    }
  ),

  on(UserInfoActions.authenticateUserActionSuccess,
    (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        loggedInUser: action.loggedInUser,
        error: undefined
      }
    }
  ),

  on(UserInfoActions.authenticateUserActionFailure,
    (state) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        loggedInUser: undefined,
        error: {
          message: 'You have entered an invalid username or password',
          name: 'LoginFailedError'
        }
      }
    }
  ),

  //
  on(UserInfoActions.upsertUserInfo,
    (state, action) => userInfoAdapter.upsertOne(action.userInfo, state)
  ),
  on(UserInfoActions.addUserInfos,
    (state, action) => userInfoAdapter.addMany(action.userInfos, state)
  ),
  on(UserInfoActions.upsertUserInfos,
    (state, action) => userInfoAdapter.upsertMany(action.userInfos, state)
  ),

  // Update user info reducers including success and failure use cases
  on(UserInfoActions.updateUserInfo,
    (state) => {
      return {
        ...state,
        loading: true
      }
    }
  ),

  on(UserInfoActions.updateUserInfoSuccess,
    (state, action) => userInfoAdapter.upsertOne(action.updatedUser,
      {
        ...state,
        loading: false,
        loggedInUser: action.updatedUser
      }
    )
  ),

  on(UserInfoActions.updateUserInfoFailure,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  ),

  on(UserInfoActions.updateUserInfos,
    (state, action) => userInfoAdapter.updateMany(action.userInfos, state)
  ),

  // Load all users
  on(UserInfoActions.loadAllUsers,
    (state) => {
      return {
        ...state,
        loading: false
      };
    }
  ),

  on(UserInfoActions.loadAllUsersSuccess,
    (state, action) => userInfoAdapter.setAll(action.users, {
      ...state,
      loading: false
    })
  ),

  on(UserInfoActions.loadAllUsersFailure,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
  ),



  on(UserInfoActions.deleteUserInfo,
    (state, action) => userInfoAdapter.removeOne(action.id, state)
  ),
  on(UserInfoActions.deleteUserInfos,
    (state, action) => userInfoAdapter.removeMany(action.ids, state)
  ),

  on(UserInfoActions.clearUserInfos,
    state => userInfoAdapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userInfoAdapter.getSelectors();
