import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { AuthService } from 'src/app/pages/auth/services';
import { UserInfo } from 'src/app/store/models';
import { selectLoggedInUserInfo } from 'src/app/store/selectors';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  userInfo$: Observable<UserInfo>;
  badge_colors = ['blue', 'orange', 'pink', 'green'];

  constructor(
    private store: Store<AppState>,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userInfo$ = this.store.select<UserInfo>( selectLoggedInUserInfo );
  }

}
