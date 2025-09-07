# Material

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Tutorial for this course 

Tuto for this project is available under -- https://www.linkedin.com/learning/angular-material-design-2/

Another interesting baseline course for Angular is available under -- https://www.linkedin.com/learning/angular-essential-training-2/

## Hints

### Start by creating modules first
A better way to create a new module, e.g. customers, orders, or messages, is to start with a module creation with routing enabled:
e.g. 
  > ng generate module customers --routing

Then add components after that:
e.g. 
  > ng generate component customers/customer-list

### Recommended VSC extensions for this course
1. 

### Installing Material Moment adapter
Material Moment enables a richer UI experience for Date and Time parsing, validation, and manipulation.
To install Moment for Angular Material, we can follow below steps:
  > npm install --save moment
  
  to install the last version of Moment js, then:

  > npm install --save @angular/material-moment-adapter@10.2.7
