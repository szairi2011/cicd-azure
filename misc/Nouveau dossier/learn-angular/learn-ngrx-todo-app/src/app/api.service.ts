import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ToDo } from './to-do/entities';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET all todos /todos
  getAllTodos(): Observable<any> {
    return this.http.get(this.API_URL + "/todos")
      .pipe(
        map( (response: HttpResponse<any>) => {
          return response;
        }),
        catchError(this.handleError)
      );
  }

  // GET a single ToDo /todos/<id>
  getTodoById(id: number): Observable<ToDo> {
    return this.http.get(this.API_URL + "/todos/" + id)
      .pipe(
        map( (response: HttpResponse<ToDo>) => {
          return response.body;
        }),
        catchError(this.handleError)
      );
  }

  // POST /todos -- insert anew ToDo item
  addToDo(todo: ToDo) {
    return this.http.post(this.API_URL + "/todos", todo )
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError(this.handleError)
      )
  }

  // PUT /todos/<id> -- update a ToDo item
  updateToDo(todo: ToDo) {
    return this.http.put(this.API_URL + "/todos/" + todo.id, todo)
      .pipe(
        map((response: HttpResponse<any>) => {
          return response;
        }),
        catchError(this.handleError)
      )
  }

  deleteToDoById(id: number) {
    return this.http.delete(this.API_URL + "/todos/" + id)
      .pipe(
        map((response: HttpResponse<any>) => null),
        catchError(this.handleError)
      )
  }

  handleError(e: HttpErrorResponse) {
    var errorMessage = "Unknown error !!";
    if (e.error instanceof ErrorEvent) {
      errorMessage = `Error: ${e.error.message}`;
    }
    else {// i.e. If the error is of type Http server side error
      errorMessage = `Error code: ${e.status} \n Error: ${e.error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
