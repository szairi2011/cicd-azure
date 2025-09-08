## Build the project

Build the project with Intellij by using Maven test goal from the Maven palette.
We can also run:
```sh
   $ mvn clean test
```

## Use Allure to generate the allute results

After building the allure report under target/allure-results, run below commands to start the allure server:
```sh
   $ allure generate ./target/allure-results
   $ allure open
```

NB: Allure cli uses JAVA_HOME environment variable to run. THe last time I had a corrupt jdk 8 env and I had to uninstall/re-install a new one.

## Jenkins URL:
- http://emea-tun-ptds01:8080/
- admin user: admin
- pwd: password

## Jenkins initialAdminPassword:
49f13df0e9d746de8f107120f6173858

## Binding to remote origin:

   ```sh
   ## 1. Create a remote origin
   $ git remote add origin <remote_repo_URL>
   ## 2. Set a remote tracking branch for local master branch to be able to push the changes to remote repo
   $ git branch --set-upstream-to=origin/master master
   ## 3. Synchronize HEAD ref between remote and local master branches
   $ git pull --rebase origin master
   ## Push local commits to remote branch
   $ git push
  ```




If you want to set all of your branches to automatically use this remote repository when you use git pull, add --set-upstream to the push:
### ```
$ git push --all --set-upstream origin
```