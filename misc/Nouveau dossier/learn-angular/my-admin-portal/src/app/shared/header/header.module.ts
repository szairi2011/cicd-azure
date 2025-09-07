import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './containers/header/header.component';

import { SearchComponent, NotificationsComponent, EmailComponent, UserComponent } from './components';

import { InitialsPipe } from './pipes/initials.pipe';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';



@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    NotificationsComponent,
    EmailComponent,
    InitialsPipe,
    UserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
