import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AddShoppingItemDialogComponent } from './crud/add-shopping-item-dialog/add-shopping-item-dialog.component';;

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ShoppingLegacyNoMatUiComponent } from './shopping-legacy-no-mat-ui/shopping-legacy-no-mat-ui.component';
import { ShoppingLegacyNoMatUi2Component } from './shopping-legacy-no-mat-ui2/shopping-legacy-no-mat-ui2.component';
import { ShoppingListMatTableDsComponent } from './shopping-list-mat-table-ds/shopping-list-mat-table-ds.component';
import { UpdateShoppingItemDialogComponent } from './crud/update-shopping-item-dialog/update-shopping-item-dialog.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { ShoppingTabsComponent } from './shopping-tabs/shopping-tabs.component';

@NgModule({
  declarations: [ShoppingListComponent, AddShoppingItemDialogComponent, ShoppingLegacyNoMatUiComponent, ShoppingLegacyNoMatUi2Component, ShoppingListMatTableDsComponent, UpdateShoppingItemDialogComponent, ShoppingCardComponent, ShoppingTabsComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatCardModule,
    MatBadgeModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class ShoppingModule { }
