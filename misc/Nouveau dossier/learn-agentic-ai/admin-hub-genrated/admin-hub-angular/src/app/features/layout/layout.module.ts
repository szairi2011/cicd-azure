import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    MainLayoutComponent,
    SidenavComponent
  ]
})
export class LayoutModule { }
