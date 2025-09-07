import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as UserTaskActions from '../actions/user-task.actions';



@Injectable()
export class UserTaskEffects {

  loadUserTasks$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(UserTaskActions.loadUserTasks),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => UserTaskActions.loadUserTasksSuccess({ data })),
          catchError(error => of(UserTaskActions.loadUserTasksFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
