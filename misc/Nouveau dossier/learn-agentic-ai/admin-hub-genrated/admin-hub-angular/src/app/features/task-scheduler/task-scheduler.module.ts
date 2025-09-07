import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TaskSchedulerComponent } from './task-scheduler.component';

const routes = [
  {
    path: '',
    component: TaskSchedulerComponent
  }
];

@NgModule({
  declarations: [
    TaskSchedulerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TaskSchedulerModule { }
