import { map, catchError } from 'rxjs/operators';
import { Credentials } from './../models/credentials';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserInfo } from 'src/app/store/models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user_info_api_url = environment.user_info_api_url;

  isAuthenticated: boolean;
  loggedInUser: UserInfo;

  constructor(private http: HttpClient) { }

  login(creds: Credentials): Observable<UserInfo> {

    return this.getUserByUsername(creds.username).pipe(
      map(user => {
        this.isAuthenticated = this.handleAuthentication(user, creds);
        if (this.isAuthenticated) {
          localStorage.setItem('userID', user.id);
          localStorage.setItem('username', user.username);
          return user;
        }
        else {
          throw new Error('User not found or invalid credentials ...');
        }
      }),
      catchError(error => {throw new Error(error)}) // Throw error in case user is not found or a connection issue occurs, etc ...
    )




    /* return of(
      {
        id: "1",
        firstname: "sofien",
        lastname: "lastname",
        email: 'sofien.zairi@fisglobal.com'
      }
    ) */
  }

  /* Validate password or through an error  */
  handleAuthentication(user: UserInfo, _creds: Credentials) {
    if ( user ) {
      return user.password === _creds.password;
    }
    else {
      throw new Error('Invalid login error ...');
    }
  }

  // Add a new user
  signup(user: UserInfo): Observable<any> {

    return this.http.post(this.user_info_api_url, user);

    // return of( user );
  }

  getUserById(id: string) {
    return this.http.get<UserInfo>(this.user_info_api_url, {params: {id: id}});
  }

  getUserByUsername(_username: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(this.user_info_api_url,
      {
        params: {
          username: _username
        }
      }
    ).pipe(
      map(users => users[0])
    );
  }

  getLoggedInUser(): Observable<UserInfo> {
    const user: UserInfo = JSON.parse(localStorage.getItem('user'));
    return of(
      user
    );
  }

  signout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('user');
  }
}
