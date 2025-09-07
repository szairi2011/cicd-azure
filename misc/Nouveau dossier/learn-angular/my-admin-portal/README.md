# MyAdminPortal

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

NB:
A number of start up scripts have been created for convenience:
1. `npm generate` to create a fake data for the development environment
1. `npm run dev` to start the json-server database, and bootstrap the Angular application in parallel.
2. `npm run generate` to generate a fake database for a convenient development experience


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


## How to set up NgRx and scaffold the store
1. Install the npm packages:
  a. 
      `npm install @ngrx/store --save`
      `npm install @ngrx/effects --save`
      `npm install @ngrx/router-store --save`
      `npm install @ngrx/store-devtools --save`
      `npm install @ngrx/entity --save`
    
    We could also install above packages in a single command like so:
      `npm install @ngrx/{store, effects, router-store, store-devtools, entity} --save`

      `npm install @ngrx/schematics --save-dev` NB: Make sure to save schematics as a dev dependency
     
  b. Set up the ngrx schematics:
    To use @ngrx/schematics as the default collection in our Angular CLI project, we can add it to our angular.json:
      `ng config cli.defaultCollection @ngrx/schematics`

  c. Create the app store:
    We first create the root level store as a central location for all feature reducers later:
      Note: We may include --dry-run flag to be in the safe side first
      `ng generate store store --module=app.module.ts --root=true --state-path=store --state-interface=AppState`

  d. Generate an actions file for a feature state:
    Again we can use ngrx schematics to reduce boilerplate:
      `ng g action store/actions/users/user-task --api=true --skip-tests  --dry-run` 
    NB: 
      - Proceed without a dry run if we are happy with the steps involved ...
      - A project called ngrx-course, in the same folder, can be followed as a learning material. It contains ngrx gists and handy ngrx schematics hints that could be used as a quick startup material  
    
  ====

  d. Generate ngrx feature files in few steps:
  Here is a hint on how we can leverage schematics to scaffold ngrx components quicker, while leveraging the power of ngrx entity:
    1. ng generate entity store/user-task --group --reducers ./index.ts --skip-tests --module ../pages/user/profile/profile.module.ts  --dry-run
    2. ng generate effect store/effects/user-task --module pages/user/profile/profile.module.ts --skip-tests --dry-run
    3. ng generate selector store/selectors/user-task --skip-tests --dry-run

========

4. ng g feature store/features/user-task --group --reducers ../index.ts --module pages/user/profile/profile.module.ts --skip-tests --dry-run

To test your Angular build locally:

## Build your app locally: ng build --prod
We may need to build a stable release and deploy the app, while switching to a different Git branch to continue improving the app and avoid ops interruptions untill we get a CI ready for this app. For this: 
1. Make sure to check out to master branch first, than merge from any previous branching if needed
2. Build the app usng following command: > ng build for a dev dist. or > ng build --prod for a production distribution
2. Install http-server for serving the app: > npm i -g http-server
3. cd (change directory) into the the build location and run the app by typing command > http-server
4. Open http-server url appending /index.html to it, should look something like this http://127.0.0.1:8080/index.html


## Git clone the application from a Linux VM:
We will use the ssh protocol to clone the project as follows
1.  Create the public/private ssh key pair from the linux environemnt:
  $ `ssh-geygen -t rsa`
  Accept all the defaults, and this will copy the private key under id_rsa and the public key under id_rsa.pub
2. From the Github repository settings page click on "Deploy keys" from left nav, e.g. https://github.com/szairi2011/my-admin-portal/settings/keys, then click on "Add deploy key" button, and finally paste the previously generated public rsa key; give it a meaningful name to remember it
3. Back to the Linux VM, we will add the private key to the ssh-agent:
  - Make sure the ssh agent is up and running first -- $ `eval $(ssh-agent)`
  - Then add the private key to ssh -- $ `ssh-add .ssh/id_rsa`
4. Create an ssh config file under the ssh directory ~/.ssh/config, and copy the content below -- this will allow ssh to use a 443 for the ssh port when connecting to Github later:
  $ cat > .ssh/config
      Host github.com
      User git
      Hostname ssh.github.com
      PreferredAuthentications publickey
      IdentityFile ~/.ssh/id_rsa
      Port 443

5. Now clone the project:
    $ `git clone git@github.com:szairi2011/my-admin-portal.git`

NB: The folowing two links are quite helpful if you can't follow above steps to clone the project:
  - https://www.toolsqa.com/git/clone-repository-using-ssh/
  - https://stackoverflow.com/questions/15589682/ssh-connect-to-host-github-com-port-22-connection-timed-out

## Git clone the application from a Jenkins job:
	To be able to checkout private projects from Github, an ssh credential needs to be set up for Jenkins (i.e. rsa private key) and Github (i.e. rsa public key). The following url is used to highlight the steps -- https://medium.com/appgambit/ssh-authentication-between-github-and-jenkins-d873dd138db0

## Useful Tutorials

Tuto for this project is available under -- https://www.linkedin.com/learning/angular-material-design-2/

Another interesting baseline course for Angular is available under -- https://www.linkedin.com/learning/angular-essential-training-2/

## Fullcalendar integration
Fullcalendar Angular library is used
 - Many features are highlighted in 'https://fullcalendar.io/demos'
 - For a code example covering many features, we can clone this project -- 'https://github.com/fullcalendar/fullcalendar-example-projects/blob/master/angular/'

 ## Continuous Deployment
 When using ArgoCD for continuous deployment, here are some useful steps to get up and running:
 - Assuming that ArgoCD is already depoyed to a K8s cluster:
    1. Login to the ArgoCD portal
      NB: Run below command to find the argocd password; this will return a base64 encoded pwd that you will need to decode -- kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
        ** The default argocd portal credentials are admin/6NKCTa1kZCY4dARw


## Deployed environments:
We can either access the application through the Ingress gateway or through the fronend-service:8081