

import { Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { AppState } from './../../../../../../store/index';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { IEditFormPartComponent} from '../../../models';
import { selectLoggedInUserInfo, selectUserById } from 'src/app/store/selectors';
import { UserInfo } from 'src/app/store/models';
import { updateUserInfo } from 'src/app/store/actions';
import { routes } from 'src/app/consts';
import { user_roles } from 'src/app/pages/user/common';

@Component({
  selector: 'app-edit-user-account',
  templateUrl: './edit-user-account.component.html',
  styleUrls: ['./edit-user-account.component.scss']
})
export class EditUserAccountComponent implements OnInit, IEditFormPartComponent {

  @Input() data?: any;

  editAccountForm: FormGroup;

  user: UserInfo;

  routes: routes;

  userRoles = user_roles;

  selectedRole: string;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.store.select(selectLoggedInUserInfo).subscribe(
      usr => this.user = usr
    );

    this.editAccountForm = this.fb.group({
      username: [this.user.username, Validators.required],
      email: [this.user.email,
      [Validators.required, Validators.email]],
      role: [this.user.role]
    });

    // Set default entry in template if user has already adequate role
    const target = this.userRoles.findIndex((role) => role.value == this.user.role);
    if (target > -1) {
      this.selectedRole = this.user.role;
    }

  }

  updateAccount() {
    console.log("Saving user account info ...");
    const toUpdate: Update<UserInfo> = {
      id: this.user.id,
      changes: {
        username: this.editAccountForm.controls.username.value,
        email: this.editAccountForm.controls.email.value,
        role: this.editAccountForm.controls.role.value
      }
    }

    this.store.dispatch(updateUserInfo({ userInfo: toUpdate }));

    /* this.navUrl = this.router.url;
    const _index = this.navUrl.indexOf('2');
    if (this.navUrl.endsWith('2')) {
      this.navUrl = this.router.url.substring(0, _index - 1);
    }
    else {
      this.navUrl += '2';
    }

    console.log('Form submitted, re-routing to: ' + this.navUrl); */

    // this.router.navigate([currentUrl]);
    // this.router.navigate([currentUrl]).then();
    // this.router.navigate(['/user/profile']).then();

    const activeUrl = this.router.url;

    setTimeout(() => {
      this.router.navigateByUrl(routes.DASHBOARD_PAGE, { skipLocationChange: false }).then(() =>
        this.router.navigate([activeUrl]));
    }, 200)

  }

}
