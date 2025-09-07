import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListModule } from './list/user-list.module';

import { UserRoutingModule } from './user-routing.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { EditUserModule } from './edit/edit-user.module';
import { AddUserModule } from './add/add-user.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    ProfileModule,
    SharedModule,
    MatToolbarModule,
    UserListModule,
    EditUserModule,
    AddUserModule
  ]
})
export class UserModule { }
