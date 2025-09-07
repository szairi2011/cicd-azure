import { Observable } from 'rxjs';
import { ApiService } from './../../api.service';
import { Injectable } from '@angular/core';
import { ToDo } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // todos: ToDo[] = [];

  constructor(private apiService: ApiService) { }

  addToDo(newTodo: ToDo): Observable<any> {
    return this.apiService.addToDo(newTodo);
  }

  getAllTodos(): Observable<any> {
    return this.apiService.getAllTodos();
  }

  toggleTodoStatus(todo: ToDo) {
    return this.apiService.updateToDo(todo);
  }

  deleteTodo(todo: ToDo) {
    return this.apiService.deleteToDoById(todo.id);
  }

}
