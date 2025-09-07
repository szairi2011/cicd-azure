import { ToDo } from './to-do';

describe('ToDo', () => {
  it('should create an instance', () => {
    expect(new ToDo()).toBeTruthy();
  });

  it('Should populate the right todo field values...', () => {
    let todo = new ToDo({
      title: "Hello",
      complete: true,
      description: "Dummy ToDo item for unit testing..."
    });

    expect(todo.title).toEqual("Hello");
    expect(todo.complete).toBe(true);
    expect(todo.description).toEqual("Dummy ToDo item for unit testing...");
  } );
});
