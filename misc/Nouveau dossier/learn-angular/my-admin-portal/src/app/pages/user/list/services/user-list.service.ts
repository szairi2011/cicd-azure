import { UserInfo } from 'src/app/store/models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  user_info_api_url = environment.user_info_api_url;

  constructor(private http: HttpClient) { }

  loadAllUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.user_info_api_url);
  }
}
