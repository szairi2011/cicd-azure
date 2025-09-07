import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/consts';
import { AuthService } from '../../services';
import { AppState } from 'src/app/store';
import { selectUserAuthenticationStatus } from 'src/app/store/selectors';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  routes = routes;
  today = new Date();
  // year: YearPipe = new YearPipe();
  error: Error;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(selectUserAuthenticationStatus)
      .subscribe( authStatus => this.handleNextAction(authStatus) );
  }

   /*
    1. Redirect to landing page if user is succefully authenticated,
    2. autherwise display any existing login error if user already tried to login
    3. else we assume that user did not try to authenticate yet
    */
  handleNextAction(_authStatus) {
    if (_authStatus.isAuthenticated) {
      this.router.navigate([routes.DASHBOARD_PAGE]).then();
    }
    else if ( _authStatus.error ) {
      this.error = _authStatus.error;

      /* {
        name: 'loginError',
        message: 'You have entered an invalid username or password'
      }; */
    }
  }

  /* authenticateUser(creds: Credentials) {
    this.authService.login(creds)
      .subscribe(
        u => {
          this.loggedInUser = u;
          this.login();
        },
        err => console.log(err)
      )
  } */

  // Login the autenticated user
  /* login() {
    if (this.loggedInUser) {

      localStorage.setItem('userID', this.loggedInUser.firstname); // session token for logged in user
      localStorage.setItem('user', JSON.stringify(this.loggedInUser)); // For user profile screen
      this.router.navigate([routes.DASHBOARD_PAGE]).then();
    }
  } */

  /* signupUser(user: User) {
    this.authService.signup(user)
      .subscribe(
        u => {
          this.loggedInUser = u;
          this.login();
        }
      );
  } */

}
