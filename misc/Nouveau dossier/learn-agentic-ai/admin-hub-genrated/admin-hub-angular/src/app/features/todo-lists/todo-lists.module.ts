import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TodoListsComponent } from './todo-lists.component';

const routes = [
  {
    path: '',
    component: TodoListsComponent
  }
];

@NgModule({
  declarations: [
    TodoListsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TodoListsModule { }
