import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';

import { Injectable } from '@angular/core';
import { FormPartItem } from '../models';
import { EditUserAccountComponent, EditUserCredsComponent, EditUserProfileComponent, EditUserSettingsComponent } from '../components/form-parts';
import { UserInfo } from 'src/app/store/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  formParts: FormPartItem[];

  user_info_api_url = environment.user_info_api_url;

  constructor(private http: HttpClient) { }

  initFormParts() {
    this.formParts = [
      {
        component: EditUserAccountComponent,
        data: 'Data for edit user account form part'
      },
      {
        component: EditUserProfileComponent,
        data: 'Date for edit user profile form part'
      },
      {
        component: EditUserCredsComponent,
        data: 'Data for edit user credential form part'
      },
      {
        component: EditUserSettingsComponent,
        data: 'Data for edit user settings form part'
      }
    ];
  }

  loadFormPart(_idx:number) {
    return this.formParts[_idx];
  }

  // Update User info, i.e. partial updates
  updateUserInfo(data: Update<UserInfo>): Observable<UserInfo> {
    return this.http.patch<UserInfo>(this.user_info_api_url + data.id, data.changes);
  }
}
