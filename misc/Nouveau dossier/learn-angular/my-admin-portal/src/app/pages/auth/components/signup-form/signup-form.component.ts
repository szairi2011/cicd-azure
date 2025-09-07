import { UserInfo } from 'src/app/store/models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { addUserInfo } from 'src/app/store/actions';
import * as uuid from 'uuid';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      username: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]],
      company: ["", Validators.maxLength(20)]
    });
  }

  signup() {

    const user: UserInfo = {
      id: uuid(),
      firstname: this.signupForm.controls.firstname.value,
      lastname: this.signupForm.controls.lastname.value,
      username: this.signupForm.controls.username.value,
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
      company: this.signupForm.controls.company?.value,

    }

    this.store.dispatch(addUserInfo(
      {
        userInfo: user
      }
    ));
  }

}
