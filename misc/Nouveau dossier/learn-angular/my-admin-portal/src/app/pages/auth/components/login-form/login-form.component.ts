import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Credentials } from '../../models';
import * as UserInfoActions from 'src/app/store/actions/user-info.actions';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  // fb: FormBuilder;
  loginForm: FormGroup;
  // @Output('sendLoginForm') loginEmitter = new EventEmitter<Credentials>();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        username: [null, Validators.required],
        password: [null, Validators.required]
      }
    )
  }

  authenticate() {
    // this.loginEmitter.emit(creds);
    this.store.dispatch(UserInfoActions.authenticateUserAction({
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    }))
  }

}
