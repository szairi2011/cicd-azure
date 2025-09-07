# Original tuto
This project was originally created by following the tutorial under -- https://www.smashingmagazine.com/2020/07/responsive-dashboard-angular-material-ng2-charts-schematics/

# Steps to set up the project for ng2-charts
NB: Make sure you have the admin rights on the machine where you need to create a new project, so that npm/ng can save/run files to local filesystem
1. From VSC cmd terminal, created a new project (`ng new learn-ng2-charts`) --> accepted routing and selected scss for styling
2. Added Angular material and material schematics using a single command (`ng add @angular/material`) --> choosed the default theme and 'y' for default options
3.  Installed ng2-charts locally by running (`npm install ng2-charts --save`, followed by `npm install chart.js@2.9.3 --save`)
  NB: chart.js v2.9.3 was the required version dependency for ng2-charts (Back then, npm has installed ng2-charts v2.4.2). Try starting the angular app and check that no errors appear 
4. Installed ng2-charts schematics as a dev dependency (`npm install ng2-charts-schematics --save-dev`)

# Steps to ceate an ng2-charts dashboard
1. Create a navigation container using material schematics (`ng generate @angular/material:navigation nav`) -- this will create a new nav component for us. We can add the <app-nav></app-nav> to the app.component.html to see the new naviagation container with a sidebar, a toolbar and a blank content container
2. Create a material dashboard using the material schematic (`ng generate @angular/material:dashboard dashboard`) -- this will create a dashboard component for us with a responsive grid --> Add a router to the dashboard (e.g. 'dashboard') to see it in action
3. Create a separte ng card component (`ng g c card --skip-tests --module app.module`) and move <mat-card> html from the dashboard.component.html to the card.component.html for better encapsulation
4. Amend the dashboard breakpoint observer code, inside dasboard.ts to include the target grid for different breakpoints (i.e. to customize layout for various screen sizes and orientations) --> running the app at this point will render the customized layout grid
5. Create the charts components inside a /charts directory using the ng2-charts schematics (`ng generate ng2-charts-scematics:<chart_type> charts/<chart_name>`)
6. Add the charts inside the grid cards to visualize the rendering for each chart type
7. Create a score card component (NB. no schematic seems to be available as of the time of writing this doc). We can create simple Angular compoent (`ng generate component score-card --module app.module`) --> Replace the dashboard <app-card> by <app-score-card> and include the necessary entries
8. All components above, charts, mini cards and table contain dummy sample data. Now, we need to subscribe to real services from, e.g. wire up services from the dashboard component, or use ngrx side effects
  NB. A number of handy material icons are available under -- https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/


## Hints:
* To customize the mat theme for the application, follow the blog under https://github.com/angular/components/issues/1786
* Check `add-user.component.ts` on how to isolate component style using `encapsulation: ViewEncapsulation.None` 
* To fix the issue faced in the add-user form page, about Scrollbar not scrolling completely down the page, we can follow the following stackoverflow thread -- https://stackoverflow.com/questions/37287506/scrollbar-not-scrolling-completely-down-the-page/37287769

