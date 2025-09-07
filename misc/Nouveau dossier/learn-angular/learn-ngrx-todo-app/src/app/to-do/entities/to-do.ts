export class ToDo {
  id: number;
  title: string;
  description: string;
  isComplete: boolean;

  // Adding a handy constructor to build a ToDo instance from a json like structure
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
