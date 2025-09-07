import { PageNotFoundComponent } from './not-found/page-not-found/page-not-found.component';
// import { ToDoPageComponent } from './to-do/containers';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    // component: ToDoPageComponent
    redirectTo: "todos"
  },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
