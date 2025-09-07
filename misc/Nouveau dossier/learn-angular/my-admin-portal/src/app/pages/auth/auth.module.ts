import { EmailService } from './services';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthPageComponent } from './containers/auth-page';
import { AuthGuard } from './guards';
import { AuthService } from './services/auth.service';

import { YearPipe } from './pipes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginFormComponent, SignupFormComponent } from './components';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AuthPageComponent,
    YearPipe,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    EmailService
  ]
})
export class AuthModule { }
