import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { IAddFormPartComponent } from '../../../models';
import { user_roles } from 'src/app/pages/user/common';
import { UserInfo } from 'src/app/store/models';
import { AddUserService } from '../../../services';

@Component({
  selector: 'app-add-user-account',
  templateUrl: './add-user-account.component.html',
  styleUrls: ['./add-user-account.component.scss']
})
export class AddUserAccountComponent implements OnInit, IAddFormPartComponent {

  @Input('stepper') stepper: MatHorizontalStepper;

  addAccountForm: FormGroup;

  title = 'Create New Account';

  userRoles = user_roles;

  @ViewChild('add_account') add_account: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private addUserService: AddUserService
  ) { }

  ngOnInit(): void {
    this.addAccountForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required],
      role: [this.userRoles[0].value]
    });
  }

  // Performa partial update on the new user locally (i.e. buffered user) prior to submission
  addAccountInfo() {

    const userAccountInfo: Partial<UserInfo> = {
      username: this.addAccountForm.get('username').value,
      email: this.addAccountForm.get('email').value,
      password: this.addAccountForm.get('password').value,
      role: this.addAccountForm.get('role').value
    }

    this.addUserService.addBufferedInfo(userAccountInfo);

    this.stepper.next();
  }

}
