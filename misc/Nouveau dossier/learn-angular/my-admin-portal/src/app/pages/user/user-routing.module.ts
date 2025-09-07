import { UserAddPageComponent } from './add/containers/user-add-page/user-add-page.component';
import { UserEditPageComponent } from './edit/containers/user-edit-page/user-edit-page.component';
import { UserListPageComponent } from './list/containers/user-list-page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePageComponent } from './profile/containers/profile-page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list'
  },
  {
    path: 'edit',
    pathMatch: 'full',
    component: UserEditPageComponent,
    data: { breadcrumb: 'Edit user'}
  },
  {
    path: 'add',
    pathMatch: 'full',
    component: UserAddPageComponent,
    data: { breadcrumb: 'Add user'}
  },
  {
    path: 'list',
    pathMatch: 'full',
    component: UserListPageComponent,
    data: { breadcrumb: 'list'}
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfilePageComponent,
    data: { breadcrumb: 'profile'}
  },
  {
    path: 'user',
    pathMatch: 'full',
    redirectTo: 'list'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
