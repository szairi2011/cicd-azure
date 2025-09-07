import { mergeMap, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserInfoActions from 'src/app/store/actions/user-info.actions';
import { AuthService } from 'src/app/pages/auth/services';
import { of } from 'rxjs';
import { EditUserService } from 'src/app/pages/user/edit/services';
import { UserListService } from 'src/app/pages/user/list/services/user-list.service';



@Injectable()
export class UserInfoEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private editUserService: EditUserService,
    private userListService: UserListService) { }

  addUserInfoEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserInfoActions.addUserInfo),
      mergeMap(
        (data) => this.authService.signup(data.userInfo)
          .pipe(
            map(() => UserInfoActions.addUserInfoSuccess(data)),
            catchError((error: Error) => of(UserInfoActions.addUserInfoFailure({ error: error })))
          )
      )
    )
  );

  authenticateUserEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserInfoActions.authenticateUserAction),
      mergeMap(
        (creds) => this.authService.login(creds)
          .pipe(
            map(
              (user) => {
                console.log('Logged in user info from user action success: ', user);
                return UserInfoActions.authenticateUserActionSuccess({ loggedInUser: user })
              }
            ),
            catchError(
              (error: Error) => {
                console.log('Login failure with error: ', error);
                return of( UserInfoActions.authenticateUserActionFailure({ error: error }) );
              }
            )
          )
      )
    )
  );

  updateUserInfoEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserInfoActions.updateUserInfo),
      mergeMap(
        (data) => this.editUserService.updateUserInfo(data.userInfo)
          .pipe(
            map((_updatedUser) => UserInfoActions.updateUserInfoSuccess({ updatedUser: _updatedUser })),
            catchError((error: Error) => of(UserInfoActions.updateUserInfoFailure({ error: error })))
          )
      )
    )
  );

  loadAllUsersEffect = createEffect(
    () => this.actions$.pipe(
      ofType(UserInfoActions.loadAllUsers),
      mergeMap(
        () => this.userListService.loadAllUsers()
          .pipe(
            map((users) => UserInfoActions.loadAllUsersSuccess({ users: users })),
            catchError((error: Error) => of(UserInfoActions.loadAllUsersFailure({ error: error })))
          )
      )
    )
  );

}
