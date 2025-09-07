# Why using ngrx vs conventional rxjs and @Input/@Output decorators:
1. Although it is quite of a learning curve to grasp ngrx ideas and apply them, it will facilitate handling of CRUD operations without a need to include repetitive @Input/@Output decorators from nested components, which won't scale up easily as the application grows
2. ngrx design principles including reducers and side effect introduce a better refactoring and encapsulation means of the code and reduce components boilerplate
3. ngrx Entity adapater and Selectors will improve the developer experience by reducing boilerplate when it comes to handling CRUD operations 

# Setting up the project
1. This project is first created by following the tuto under https://developer.school/introduction-to-ngrx-store/, followed by the ngrx side effects one -- https://developer.school/introduction-to-ngrx-effects/
2. The project eveolved to include a mat-table datasource and CRUD operation to handle shopping list items, by following the tutorial under https://github.com/marinantonio/angular-mat-table-crud/; however we resolved to take a simpler approach by using MatTableDataSource with the build-in filtering, sorting, pagination functionalities
3. The project also evolved to include ngrx principles - https://github.com/Nikolay-Uvarov/mat-table-with-NgRx to show case the convenience of this reactive approachn when it comes to managing the application state with a reduced dev effort  

- Create a new Angular project:
$ ng new ngrx-shopping-list

- Go ahead and install ngrx/store first:
$ npm install @ngrx/store

You can also use the shortcut ng add @ngrx/store to have the Angular CLI automate some of what we cover in this article.

$ ng add @ngrx/store

# Adding the shopping list
1. Create datamodel: For this project we will use a simple form to add and delete shopping items.
Let's create an entitity for a ShoppingItem under the data model folder.
2. Create actions:
  Store Actions have a mandatory type variable and an optional payload variable
  * type is a read-only string that represents the type of action dispatched into the application.
  * payload is an optional property that adds any related data required for completing the action.

# AppState
Next we can create an AppStae interface and add it to our data model. This class will provide aconvenient strong type checks when selecting state slices from the store.

# Adding ngrx components
1. Create actions using either creators approach or a traditional class based approach --> we followed a the class based approach in this project
2. Create ShoppingState and define entity selectors to reduce boilerplate when selecting state slices from the components
3. create shopping reducers to update the state

# Create a feature component
1. Create a store, models, services, ... subformders
2. Create shopping list component to hold a a mat-table datasource. This will be the main UI where CRUD operation will be invoked
3. When user clicks on add or edit, a modal Dialog box will popup, allowing the user to either add a new item or update an exiting one

# How to start the application
1. Start the json-server rest api backend by running:
  > json-server .\db.json
This will start a backend rest api service listening on port 3000
2. Start the anguler app (i.e. run > ng sreve -o), and browse to http://localhost:4200/shopping/mat-table-ds to see the ngrx crud + material table implmentaion in action
3. A no material UI is also available under http://localhost:4200/shopping/legacy to show case a simple <ul> based list of items, still using ngrx, and async pipe to let angular automatically observable subscriptions

# Additional readings
Additional readings are available from the bookmarked pages under - Interns > angular > handy tutorials > learn-angular-todo-app-from_basic_to_advanced

