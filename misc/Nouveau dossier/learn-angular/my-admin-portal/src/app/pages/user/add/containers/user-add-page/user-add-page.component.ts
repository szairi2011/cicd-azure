import { AddUserFormPartLoaderComponent } from './../../components/add-user-form-part-loader/add-user-form-part-loader.component';
import { AddUserFormStepperComponent } from './../../components/add-user-form-stepper/add-user-form-stepper.component';
import { FormGroup } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, QueryList } from '@angular/core';

@Component({
  selector: 'app-user-add-page',
  templateUrl: './user-add-page.component.html',
  styleUrls: ['./user-add-page.component.scss']
})
export class UserAddPageComponent implements OnInit, AfterViewInit {

  constructor() { }

  stepper: MatHorizontalStepper;
  @ViewChild(AddUserFormStepperComponent) stepperComponent : AddUserFormStepperComponent;

  stepForms: FormGroup[];
  @ViewChild(AddUserFormPartLoaderComponent) loaderComponent : AddUserFormPartLoaderComponent;


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.stepForms = [
        this.loaderComponent.accountComponent.addAccountForm,
        this.loaderComponent.detailsComponent.addUserDetailsForm,
        this.loaderComponent.businessComponent.addBusinessDetailsForm,
        this.loaderComponent.socialNetworkComponent.addSocialNetworkForm
      ];
      this.stepper = this.stepperComponent.stepper;
      // console.log("UserAddPageComponent :: stepperComponent value: ", this.stepperComponent);
      // console.log("UserAddPageComponent :: Stepper value: ", this.stepper);
    });

  }

}
