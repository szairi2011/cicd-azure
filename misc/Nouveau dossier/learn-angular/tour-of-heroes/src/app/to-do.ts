export class ToDo {
    
    id : number;
    title : string;
    complete : boolean = false;
    description : string;

    constructor(todoPropsObj : object = {}) {
        Object.assign(this, todoPropsObj);
    }

}
