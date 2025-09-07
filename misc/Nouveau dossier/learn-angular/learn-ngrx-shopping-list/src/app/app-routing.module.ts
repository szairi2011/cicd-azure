import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'shopping',
    loadChildren: () => import('./shopping/shopping.module').then(mod => mod.ShoppingModule)
  },
  {
    path:'',
    redirectTo: 'shopping/legacy',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
