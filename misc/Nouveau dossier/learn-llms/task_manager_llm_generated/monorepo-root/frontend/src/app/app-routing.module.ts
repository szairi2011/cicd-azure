import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CalendarManagerComponent } from './components/calendar-manager/calendar-manager.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'calendar', component: CalendarManagerComponent },
  { path: 'menu', component: TaskListComponent }, // Placeholder
  { path: 'settings', component: TaskListComponent }, // Placeholder
  { path: 'options', component: TaskListComponent }, // Placeholder
  { path: 'poplogs', component: TaskListComponent }, // Placeholder
  { path: 'collages', component: TaskListComponent }, // Placeholder
  { path: 'legal', component: TaskListComponent }, // Placeholder
  { path: '**', redirectTo: '/tasks' } // Handle 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
