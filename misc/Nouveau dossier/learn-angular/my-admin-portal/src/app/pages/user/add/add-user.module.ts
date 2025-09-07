import { AddUserService } from './services/add-user.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddUserRoutingModule } from './add-user-routing.module';
import { UserAddPageComponent } from './containers/user-add-page/user-add-page.component';
import { AddUserFormStepperComponent } from './components/add-user-form-stepper/add-user-form-stepper.component';
import { AddUserFormPartLoaderComponent } from './components/add-user-form-part-loader/add-user-form-part-loader.component';
import { AddUserAccountComponent } from './components/form-parts/add-user-account/add-user-account.component';
import { AddUserDetailsComponent } from './components/form-parts/add-user-details/add-user-details.component';
import { AddUserBusinessDetailsComponent } from './components/form-parts/add-user-business-details/add-user-business-details.component';
import { AddUserSocialNetworkDetailsComponent } from './components/form-parts/add-user-social-network-details/add-user-social-network-details.component';


@NgModule({
  declarations: [
    UserAddPageComponent,
    AddUserFormStepperComponent,
    AddUserFormPartLoaderComponent,
    AddUserAccountComponent,
    AddUserDetailsComponent,
    AddUserBusinessDetailsComponent,
    AddUserSocialNetworkDetailsComponent
  ],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatStepperModule,
    RouterModule
  ],
  providers: [
    AddUserService
  ]
})
export class AddUserModule { }
