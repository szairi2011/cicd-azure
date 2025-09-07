import { LeftnavComponent } from './containers';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { RouterModule } from '@angular/router';
import { TreeMenuItemComponent } from './components/tree-menu-item/tree-menu-item.component';



@NgModule({
  declarations: [
    LeftnavComponent,
    TreeMenuItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatTreeModule
  ],
  exports: [
    LeftnavComponent
  ]
})
export class SidebarModule { }
