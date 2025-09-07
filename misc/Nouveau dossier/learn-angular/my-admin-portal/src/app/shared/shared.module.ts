import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarModule } from './sidebar/sidebar.module';
import { HeaderModule } from './header/header.module';
import { CommonModule } from '@angular/common';
import { SettingsMenuComponent } from './ui-elements/settings-menu/settings-menu.component';

import { LayoutComponent } from './layout/layout.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    SettingsMenuComponent,
    LayoutComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    SidebarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule
  ],
  exports: [
    SettingsMenuComponent,
    LayoutComponent,
    FooterComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
