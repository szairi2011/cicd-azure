import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPageComponent } from './pages/auth/containers/auth-page';
import { AuthGuard } from './pages/auth/guards';
import { DashboardPageComponent } from './pages/dashboard/containers/dashboard-page';
import { CalendarPageComponent } from './pages/calendar/containers/calendar-page/calendar-page.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: AuthPageComponent
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    // data: { title: 'user' }
    data: { breadcrumb: 'users' }
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: DashboardPageComponent,
    data: { breadcrumb: 'dashboards' }
  },
  {
    path: 'calendar',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    component: CalendarPageComponent,
    data: { breadcrumb: 'calendar' }
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    // redirectTo: 'dashboard'
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
