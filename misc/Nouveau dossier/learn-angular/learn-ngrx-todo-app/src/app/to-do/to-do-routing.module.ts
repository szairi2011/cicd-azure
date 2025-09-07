import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component';
import { ToDoPageComponent } from './containers/todo-page/todo-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './../not-found/page-not-found/page-not-found.component';

import { TodosResolver } from './resolvers/todos.resolver';

const routes: Routes = [
  {
    path: 'todos',
    component: ToDoPageComponent
  },
  {
    path: 'todos/:id',
    pathMatch: 'full',
    component: TodoListItemComponent,
    resolve: {// Useful if data takes too long to load from the server
      'todos': TodosResolver
    }
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TodosResolver
  ]
})
export class ToDoRoutingModule { }
