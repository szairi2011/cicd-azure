import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { ShoppingTabsComponent } from './shopping-tabs/shopping-tabs.component';
import { ShoppingListMatTableDsComponent } from './shopping-list-mat-table-ds/shopping-list-mat-table-ds.component';
import { ShoppingLegacyNoMatUiComponent } from './shopping-legacy-no-mat-ui/shopping-legacy-no-mat-ui.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingLegacyNoMatUi2Component } from './shopping-legacy-no-mat-ui2/shopping-legacy-no-mat-ui2.component';

const routes: Routes = [
  {
    path: 'legacy',
    component: ShoppingLegacyNoMatUiComponent
  },
  {
    path: 'legacy2',
    component: ShoppingLegacyNoMatUi2Component
  },
  {
    path: 'mat-table-ds',
    component: ShoppingListMatTableDsComponent
  },
  {
    path: 'tabs',
    component: ShoppingTabsComponent
  },
  {
    path: 'card',
    component: ShoppingCardComponent
  },
  {
    path: '',
    component: ShoppingListComponent
  },
  // For erronous path redirect to no-mat legacy UI
  {
    path: '**',
    redirectTo: 'legacy'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
