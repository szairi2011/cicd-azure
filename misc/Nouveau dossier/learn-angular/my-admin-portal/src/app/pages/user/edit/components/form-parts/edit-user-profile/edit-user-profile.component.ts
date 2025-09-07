import { Update } from '@ngrx/entity';
import { Router } from '@angular/router';
import { AppState } from './../../../../../../store/index';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { IEditFormPartComponent } from '../../../models';
import { UserInfo } from 'src/app/store/models';
import { routes } from 'src/app/consts';
import { selectLoggedInUserInfo } from 'src/app/store/selectors';
import { updateUserInfo } from 'src/app/store/actions';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss']
})
export class EditUserProfileComponent implements OnInit, IEditFormPartComponent {

  @Input() data: any;

  editProfileForm: FormGroup;

  user: UserInfo;

  routes: routes;

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

    this.editProfileForm = this.fb.group({
      firstname: [this.user.firstname, Validators.required],
      lastname: [this.user.lastname],
      company: [this.user.company]
    });

  }

  updateProfile() {
    console.log("Saving user profile info ...");
    const toUpdate: Update<UserInfo> = {
      id: this.user.id,
      changes: {
        firstname: this.editProfileForm.controls.firstname.value,
        lastname: this.editProfileForm.controls.lastname.value,
        company: this.editProfileForm.controls.company.value
      }
    }

    this.store.dispatch(updateUserInfo({ userInfo: toUpdate }));

    const activeUrl = this.router.url
    setTimeout(() => {
      this.router.navigateByUrl(routes.DASHBOARD_PAGE, { skipLocationChange: false }).then(() =>
        this.router.navigate([activeUrl]));
    }, 500)
  }

}
