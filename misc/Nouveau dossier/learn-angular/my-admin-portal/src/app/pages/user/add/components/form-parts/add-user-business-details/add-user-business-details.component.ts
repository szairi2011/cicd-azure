import { UserInfo } from 'src/app/store/models';
import { MatHorizontalStepper } from '@angular/material/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { IAddFormPartComponent } from '../../../models';
import { AddUserService } from '../../../services';

@Component({
  selector: 'app-add-user-business-details',
  templateUrl: './add-user-business-details.component.html',
  styleUrls: ['./add-user-business-details.component.scss']
})
export class AddUserBusinessDetailsComponent implements OnInit, IAddFormPartComponent {

  @Input('stepper') stepper: MatHorizontalStepper;

  addBusinessDetailsForm: FormGroup;

  title = 'Create Business Details';

  @ViewChild('add_business_details') business_details: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private addUserService: AddUserService
  ) { }

  ngOnInit(): void {
    this.addBusinessDetailsForm = this.fb.group({
      company: ['', Validators.required],
      business_email: ['', Validators.email],
      business_phone: null,
    });
  }

  // Progressively store user details prior to final submission
  addBusinessInfo() {

    const businessUserInfo: Partial<UserInfo> = {
      company: this.addBusinessDetailsForm.get('company').value,
      business_email: this.addBusinessDetailsForm.get('business_email').value,
      business_phone: this.addBusinessDetailsForm.get('business_phone').value
    }

    this.addUserService.addBufferedInfo(businessUserInfo);

    this.stepper.next();
  }

}
