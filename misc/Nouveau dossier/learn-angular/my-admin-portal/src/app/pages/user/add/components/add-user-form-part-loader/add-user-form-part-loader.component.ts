import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormBuilder } from '@angular/forms';
import { Component, Input, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { IAddFormPartComponent } from '../../models';
import { AddUserAccountComponent, AddUserBusinessDetailsComponent, AddUserDetailsComponent, AddUserSocialNetworkDetailsComponent } from '../form-parts';

@Component({
  selector: 'app-add-user-form-part-loader',
  templateUrl: './add-user-form-part-loader.component.html',
  styleUrls: ['./add-user-form-part-loader.component.scss']
})
export class AddUserFormPartLoaderComponent implements OnInit, AfterViewInit {

  @Input('stepper') stepper: MatHorizontalStepper;

  stepTemplateRefs: TemplateRef<any>[];

  components: IAddFormPartComponent[];

  @ViewChild(AddUserAccountComponent) accountComponent: AddUserAccountComponent;

  @ViewChild(AddUserDetailsComponent) detailsComponent: AddUserDetailsComponent;

  @ViewChild(AddUserBusinessDetailsComponent) businessComponent: AddUserBusinessDetailsComponent;

  @ViewChild(AddUserSocialNetworkDetailsComponent) socialNetworkComponent: AddUserSocialNetworkDetailsComponent;

  constructor(
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(
      () => {
        this.stepTemplateRefs = [
          this.accountComponent.add_account,
          this.detailsComponent.user_details,
          this.businessComponent.business_details,
          this.socialNetworkComponent.social_network_details
        ];

        this.components = [this.accountComponent, this.detailsComponent, this.businessComponent, this.socialNetworkComponent];
      }
    )
  }
}
