import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataModelComponent } from './data-model/data-model.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [  { path: '', component: LoginComponent },
{ path: 'login', component: LoginComponent },
{ path: 'datamodel', component: DataModelComponent },
{ path: '**', component: ErrorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
