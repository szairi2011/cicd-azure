import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ToDoRoutingModule } from './to-do-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TodoComponent } from './components';
import { TodoListComponent } from './components';
import { TodoListItemComponent } from './components';
import { TodoService } from './services';
import { ToDoPageComponent } from './containers';


@NgModule({
  declarations: [
    TodoComponent,
    TodoListComponent,
    TodoListItemComponent,
    ToDoPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ToDoRoutingModule,
    SharedModule
  ],
  providers: [
    TodoService
  ]
})
export class ToDoModule { }
