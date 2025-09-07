import { roles } from './entities/user.roles';
import { states } from './entities/us.states';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false, showError:true}
  }],
  // encapsulation: ViewEncapsulation.None,
})
export class AddUserComponent {

  // Create User Aaccount form group
  roles: roles;
  hide: boolean = true; // a flag to control password appearance on the form

  createNewAccount = this.fb.group({
    username: null,
    email: null,
    password: null,
    role: null
  });

  // Create User details form group
  states: states;

  userDetails = this.fb.group({
    // firstName: [null, Validators.required],
    // lastName: [null, Validators.required],
    firstname: null,
    lastname: null,
    phone: null,
    email: null,
    country: null,
    city: null,
    state: null,
    address: null
    // postalCode: [null, Validators.compose([
    //   Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    // ],
  });

// Business details form group
businessDetails = this.fb.group({
  company: null,
  companyID: null,
  businessPhone: null,
  businessEmail: null
});

  hasUnitNumber = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    alert('Form submitted ...');
  }
}
