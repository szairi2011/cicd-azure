import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { NgModule } from '@angular/core';
import { UserEditPageComponent } from './containers/user-edit-page/user-edit-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditNavBarComponent } from './components/edit-nav-bar/edit-nav-bar.component';
import { EditUserFormPartLoaderComponent } from './components/edit-user-form-part-loader/edit-user-form-part-loader.component';
import { EditPartLoaderDirective } from './directives/edit-part-loader.directive';
import { EditUserService } from './services/edit-user.service';
import { EditUserAccountComponent } from './components/form-parts';
import { EditUserProfileComponent } from './components/form-parts';
import { EditUserCredsComponent } from './components/form-parts';
import { EditUserSettingsComponent } from './components/form-parts/edit-user-settings/edit-user-settings.component';



@NgModule({
  declarations: [
    UserEditPageComponent,
    EditNavBarComponent,
    EditUserFormPartLoaderComponent,
    EditPartLoaderDirective,
    EditUserAccountComponent,
    EditUserProfileComponent,
    EditUserCredsComponent,
    EditUserSettingsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule
  ],
  providers: [
    EditUserService
  ]
})
export class EditUserModule { }
