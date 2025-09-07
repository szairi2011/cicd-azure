import { Injectable } from '@angular/core';
import { ToDo } from './to-do';

@Injectable({
  providedIn: 'root'
})

export class ToDoDataService {
  

  //Keeps track of the size of the array
  lastId : number = 0;

  todos : ToDo[] = [];

  constructor() { }

  addToDo(todo : ToDo) : ToDoDataService {
    
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    
    this.todos.push(todo);
    
    return this;
  };

  deleteToDoById(id:number) : ToDoDataService {
    
    if (null != this.todos) {

      this.todos = this.todos.filter(todo => todo.id !== id);
      
    }
    return this;
  }

  updateToDoById(id: number, values:Object = {}): ToDoDataService {
     
    let oldToDo = this.getToDoById(id);

    Object.assign(oldToDo, values);

    return this;
  }

  getToDoById(id:number):ToDo {
    
    return this.todos.filter(curTodo => curTodo.id == id).pop();
  }

  getAllToDos() : ToDo[] {
    return this.todos;
  }

}
