import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userInfoAdapter, userInfoFeatureKey, UserInfoState } from '../reducers';

// Get basic entity selectors first
const {
  selectIds: _selectIds,
  selectAll: _selectAll, // Returns an array of all users
  selectEntities: _selectEntities, // Returns a dictionary of {key, Userinfo object}
  selectTotal: _selectTotal // Returns total number of items
} = userInfoAdapter.getSelectors();

const _userInfoFeatureSelector = createFeatureSelector<UserInfoState>(userInfoFeatureKey);

export const selectAllUsers = createSelector(
  _userInfoFeatureSelector,
  _selectAll
);

export const selectAllUsersDictionary = createSelector(
  _userInfoFeatureSelector,
  _selectEntities
);

export const selectUserLoadingStatus = createSelector(
  _userInfoFeatureSelector,
  (state: UserInfoState) => state.loading
);

export const selectUserAuthenticationStatus = createSelector(
  _userInfoFeatureSelector,
  (state: UserInfoState) => {
    return {
      isAuthenticated: state.isAuthenticated,
      error: state.error
    }
  }
);

export const selectLoggedInUserInfo = createSelector(
  _userInfoFeatureSelector,
  (state: UserInfoState) => {
    return state.loggedInUser
  }
)

export const selectUserById = createSelector(
  _userInfoFeatureSelector,
  (state: UserInfoState, props) => {
    const user = state.entities[props.id];
    return user;
  }
);
