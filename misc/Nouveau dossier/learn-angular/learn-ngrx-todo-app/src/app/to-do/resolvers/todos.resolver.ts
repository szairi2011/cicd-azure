import { ToDo } from './../entities/to-do';
import { Observable } from 'rxjs';
import { TodoService } from '../services/';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class TodosResolver implements Resolve<Observable<ToDo[]>> {

  constructor(
    private todoDataService: TodoService
  ) {
  }

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.todoDataService.getAllTodos();
  }
}
