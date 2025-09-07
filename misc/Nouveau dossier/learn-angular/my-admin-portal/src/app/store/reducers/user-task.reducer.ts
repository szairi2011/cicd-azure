import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserTask } from '../models/user-task.model';
import * as UserTaskActions from '../actions/user-task.actions';

export const userTasksFeatureKey = 'userTasks';

export interface UserTaskState extends EntityState<UserTask> {
  list?: UserTask[];
  loading?: boolean;
  error?: any;
}

export const userTaskAdapter: EntityAdapter<UserTask> = createEntityAdapter<UserTask>();

export const initialState: UserTaskState = userTaskAdapter.getInitialState({
  // additional entity state properties
});


export const userTaskReducer = createReducer(
  initialState,

  /* Crate a new user task */
  on(UserTaskActions.addUserTask,
    (state, action) => {
      return {
        ... state,
        loading: true
      }
    }
  ),

  on(UserTaskActions.addUserTaskSuccess,
    (state, action) => userTaskAdapter.addOne(action.userTask, {
      ... state,
      loading: false
    })
  ),

  on(UserTaskActions.addUserTaskFailure,
    (state, action) => {
      return {
        ... state,
        loading:false,
        error: action.error
      }
    }
  ),

  /*  */

  on(UserTaskActions.upsertUserTask,
    (state, action) => userTaskAdapter.upsertOne(action.userTask, state)
  ),
  on(UserTaskActions.addUserTasks,
    (state, action) => userTaskAdapter.addMany(action.userTasks, state)
  ),
  on(UserTaskActions.upsertUserTasks,
    (state, action) => userTaskAdapter.upsertMany(action.userTasks, state)
  ),

  /* Update reducers including succes and failure actions */
  on(UserTaskActions.updateUserTask,
    (state, action) => {
      return { ...state, loading: true }
    }
  ),
  on(UserTaskActions.updateUserTaskSuccess,
    (state, action) => userTaskAdapter.updateOne(action.userTask, {
      ...state,
      loading: false
    })
  ),
  on(UserTaskActions.updateUserTaskFailure,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  ),

  /*  */
  on(UserTaskActions.updateUserTasks,
    (state, action) => userTaskAdapter.updateMany(action.userTasks, state)
  ),

  /* Delete user task */
  on(UserTaskActions.deleteUserTask,
    (state, action) => {
      return { ... state, loading: true}
    }
  ),

  on(UserTaskActions.deleteUserTaskSuccess,
    (state, action) => userTaskAdapter.removeOne(action.id, {
      ... state,
      loading: false
    })),

  on(UserTaskActions.deleteUserTaskFailure,
    (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  ),

  /* */
  on(UserTaskActions.deleteUserTasks,
    (state, action) => userTaskAdapter.removeMany(action.ids, state)
  ),

  /* Load user tasks action including success failure */
  on(UserTaskActions.loadUserTasks,
    (state, action) => {
      return {
        ...state,
        loading: true
      }
    }),

    on(UserTaskActions.loadUserTasksSuccess,
    (state, action) => userTaskAdapter.setAll(action.userTasks, state)
  ),

  on(UserTaskActions.loadUserTasksFailure,
    (state, action) => {
      return {
        ... state,
        loading: false,
        error: action.error
      }
    }),

  /*  */
  on(UserTaskActions.clearUserTasks,
    state => userTaskAdapter.removeAll(state)
  ),
);


/* export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = userTaskAdapter.getSelectors(); */
