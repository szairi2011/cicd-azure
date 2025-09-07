import { mergeMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as UserTaskActions from '../actions/user-task.actions';
import { UserTaskService } from 'src/app/pages/user/profile/services';
import { of } from 'rxjs';


@Injectable()
export class UserTaskEffects {

  constructor(
    private actions$: Actions,
    private userTaskService: UserTaskService
    ) { }

  loadUserTasksEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserTaskActions.loadUserTasks),
      mergeMap(
        () => this.userTaskService.loadUserTasks()
          .pipe(
            map( (data) => UserTaskActions.loadUserTasksSuccess( {userTasks: data} )),
            catchError( error => of( UserTaskActions.loadUserTasksFailure( error ) ) )
          )
      )
    )
  );

  updateUserTaskEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserTaskActions.updateUserTask),
      mergeMap(
        (data) => this.userTaskService.updateUserTask(data.userTask)
        .pipe(
          map( () => UserTaskActions.updateUserTaskSuccess( data ) ),
          catchError( error => of( UserTaskActions.updateUserTaskFailure( error ) ) )
        )
      )
    )
  );

  deleteUserTaskEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserTaskActions.deleteUserTask),
      mergeMap(
        (data) => this.userTaskService.deleteUserTask(data.id)
        .pipe(
          map( () => UserTaskActions.deleteUserTaskSuccess( data ) ),
          catchError( error => of( UserTaskActions.deleteUserTaskFailure( error ) ) )
        )
      )
    )
  );

  addUserTaskEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserTaskActions.addUserTask),
      mergeMap(
        (data) => this.userTaskService.addUserTask(data.userTask)
        .pipe(
          map( () => UserTaskActions.addUserTaskSuccess( data ) ),
          catchError( error => of( UserTaskActions.addUserTaskFailure( error ) ) )
        )
      )
    )
  );

}
