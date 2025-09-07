// frontend/src/app/app-routing.module.ts
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

// Update frontend/src/app/app.module.ts to use the routing module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { CalendarManagerComponent } from './components/calendar-manager/calendar-manager.component';
import { ProgressChartComponent } from './components/progress-chart/progress-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TaskListComponent,
    CalendarManagerComponent,
    ProgressChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
