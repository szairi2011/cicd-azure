# LearnNgrxTodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## How this project was created

1. The project is created initially from a basic implementation (https://www.sitepoint.com/angular-2-tutorial/), where ngrx is not used. The idea is to build the app step by step and gain a learning momentum. Then, as a 2nd phase ngrx will be implemented to better grasp the concepts end to end.
  ### To run the basic impl project (we can checkout from v1.0 tagged commit using following command > git checkout v1.0 -b <new-branch>):
    #### Run folloing scripts, which are added to package.json as follows:
      > npm run generate  => this wil generate a mockup todo data using faker
      > npm run backend   => This wil start a mockup backend, i.e. json-server
      > ng serve -o or npm start

1. This project has then been improved to include ngrx by following both:
  
  - A LinkedIn tuto -- https://www.linkedin.com/learning/learning-ngrx/next-steps?u=2141490 , which is a good starting point to learn ngrx and its concepts
  
  - And the medium tutorial of the improved todo app -- https://medium.com/@richbray/a-beginners-guide-to-ngrx-store-bc2184d6d7f0

1. As a third stage, the UI will be improved to use Angular material UI features


