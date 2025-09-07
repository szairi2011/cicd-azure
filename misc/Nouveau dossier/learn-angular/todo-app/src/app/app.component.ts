import { Component } from '@angular/core';
import { ToDoDataService } from './to-do-data.service';
import { ToDo } from './to-do';

@Component({

  providers: [ToDoDataService],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'todo-app';
  newToDo: ToDo = new ToDo();
  
  constructor(private service:ToDoDataService) {}

  addToDo(todo:ToDo) {
    
    this.service.addToDo(todo);
    this.newToDo = todo;
  }

  deleteToDo(todo:ToDo) {
    
    this.service.deleteToDoById(todo.id);
  }

  toggleToDoComplete(todo:ToDo) {
    
    //todo.complete = true;
    
    this.service.updateToDoById(todo.id, {
      complete: !todo.complete
    });
  }

  get todos() : ToDo[] {
    return this.service.getAllToDos();
  }

}
