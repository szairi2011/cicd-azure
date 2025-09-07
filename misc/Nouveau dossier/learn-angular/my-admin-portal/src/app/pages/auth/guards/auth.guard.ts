import { routes } from './../../../consts/routes';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { UserInfo } from 'src/app/store/models';
import { selectLoggedInUserInfo } from 'src/app/store/selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  routes = routes;
  loggedInUser: UserInfo;

  constructor(
    private router: Router,
    private store: Store<AppState>) {}

  // Redirect non authenticated user to the login page
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const loggedInUserID = localStorage.getItem('userID');

    // TODO -- This will cause user to re-authenticate on page reload not a good idea, we need to change later !!
    this.store.select<UserInfo>( selectLoggedInUserInfo )
      .subscribe(user => this.loggedInUser = user);

    if (loggedInUserID && this.loggedInUser) {
      return true;
    }
    else {
      return this.router.navigate([routes.LOGIN_PAGE]);
    }
  }

}
