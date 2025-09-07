import { TestBed, inject } from '@angular/core/testing';

import { ToDoDataService } from './to-do-data.service';
import { ToDo } from './to-do';

describe('ToDoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToDoDataService]
    });
  });

  it('should be created', inject([ToDoDataService], (service: ToDoDataService) => {
    expect(service).toBeTruthy();
  }));

  // Assuming an empty todo list at the beginning, which may change in future if we start using rest service
  it("should add a ToDo item...", inject([ToDoDataService], (service:ToDoDataService) => {

    let todo1 = new ToDo({
      title: "New item",
      complete: false,
      description: "Some description..."
    })

    service.addToDo(todo1);
    
    expect(service.getAllToDos()).toEqual([todo1]);

  }));

  it("should delete an item", inject([ToDoDataService], (service : ToDoDataService) => {

    let todo1 = new ToDo({
      title: "New item",
      description: "Some description..."
    });

    let todo2 = new ToDo({
      title: "Another item",
      description: "Another description..."
    })

    service.addToDo(todo1);
    service.addToDo(todo2);

    service.deleteToDoById(todo1.id)

    expect(service.getAllToDos()).toEqual([todo2]);

  }));

});
