import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

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
    RouterModule.forRoot([
      { path: '', redirectTo: '/tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskListComponent },
      { path: 'calendar', component: CalendarManagerComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
