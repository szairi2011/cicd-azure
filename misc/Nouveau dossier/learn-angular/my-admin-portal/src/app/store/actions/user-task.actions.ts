import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { UserTask } from '../models/user-task.model';


// Load user tasks with success & failure actions
export const loadUserTasks = createAction(
  '[UserTask/API] Load UserTasks'
);

export const loadUserTasksSuccess = createAction(
  '[UserTask/API] Load UserTasks Success',
  props<{ userTasks: UserTask[] }>()
);

export const loadUserTasksFailure = createAction(
  '[UserTask/API] Load UserTasks Failure',
  props<{ error: Error }>()
);

// Add a new user task with success & failure actions
export const addUserTask = createAction(
  '[UserTask/API] Add UserTask',
  props<{ userTask: UserTask }>()
);

export const addUserTaskSuccess = createAction(
  '[UserTask/API] Add UserTask Success',
  props<{ userTask: UserTask }>()
);

export const addUserTaskFailure = createAction(
  '[UserTask/API] Add UserTask Failure',
  props<{ error: Error }>()
);

/*  */
export const upsertUserTask = createAction(
  '[UserTask/API] Upsert UserTask',
  props<{ userTask: UserTask }>()
);

export const addUserTasks = createAction(
  '[UserTask/API] Add UserTasks',
  props<{ userTasks: UserTask[] }>()
);

export const upsertUserTasks = createAction(
  '[UserTask/API] Upsert UserTasks',
  props<{ userTasks: UserTask[] }>()
);

/* Update actions including success and failure */
export const updateUserTask = createAction(
  '[UserTask/API] Update UserTask',
  props<{ userTask: Update<UserTask> }>()
);

export const updateUserTaskSuccess = createAction(
  '[UserTask/API] Update UserTask Success',
  props<{ userTask: Update<UserTask> }>()
);

export const updateUserTaskFailure = createAction(
  '[UserTask/API] Update UserTask Failure',
  props<{ error: Error }>()
);

/*  */
export const updateUserTasks = createAction(
  '[UserTask/API] Update UserTasks',
  props<{ userTasks: Update<UserTask>[] }>()
);

/* Delete user task including sucess and failure */
export const deleteUserTask = createAction(
  '[UserTask/API] Delete UserTask',
  props<{ id: string }>()
);

export const deleteUserTaskSuccess = createAction(
  '[UserTask/API] Delete UserTask Success',
  props<{ id: string }>()
);

export const deleteUserTaskFailure = createAction(
  '[UserTask/API] Delete UserTask Failure',
  props<{ error: Error }>()
);


/* */

export const deleteUserTasks = createAction(
  '[UserTask/API] Delete UserTasks',
  props<{ ids: string[] }>()
);

export const clearUserTasks = createAction(
  '[UserTask/API] Clear UserTasks'
);
