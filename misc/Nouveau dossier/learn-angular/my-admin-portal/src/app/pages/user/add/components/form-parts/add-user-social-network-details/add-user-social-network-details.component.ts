import { filter } from 'rxjs/operators';
import { IAddFormPartComponent } from './../../../models/add-form-part.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { UserInfo } from 'src/app/store/models';
import { AddUserService } from '../../../services';
import { Store } from '@ngrx/store';
import { AppComponent } from 'src/app/app.component';
import { addUserInfo } from 'src/app/store/actions';
import * as uuid from 'uuid';

@Component({
  selector: 'app-add-user-social-network-details',
  templateUrl: './add-user-social-network-details.component.html',
  styleUrls: ['./add-user-social-network-details.component.scss']
})
export class AddUserSocialNetworkDetailsComponent implements OnInit, IAddFormPartComponent {

  @Input('stepper') stepper: MatHorizontalStepper;

  addSocialNetworkForm: FormGroup;

  title = 'Social Network Details';

  @ViewChild('social_network_details') social_network_details: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private addUserService: AddUserService,
    private store: Store<AppComponent>
  ) { }

  ngOnInit(): void {
    this.addSocialNetworkForm = this.fb.group({
      facebook: null,
      twitter: null,
      instagram: null,
      company_contact: null,
      github: null
    });
  }

  // Submit only non empty buffered user properties
  submit() {

    let socialNetworkInfo = this.addSocialNetworkForm.value;

    this.addUserService
      .addBufferedInfo(socialNetworkInfo)
      .subscribe((buffered_user) => {
        this.cleanUp(buffered_user);
        buffered_user = { id: uuid(), ...buffered_user };
        // console.log("Cleaned up buffered user: ", buffered_user);
        this.store.dispatch(addUserInfo(
          {
            userInfo: buffered_user
          }
        ));
      });
  }

  /*
    For a tidier DB records, we save a clean json object of the user info by
    removing properties having null or empty string values
  */
  cleanUp(pairs): Partial<UserInfo> {
    for (let prop of Object.keys(pairs)) {
      if (!pairs[prop]) {
        delete pairs[prop];
      }
    }
    return pairs;
  }

}
