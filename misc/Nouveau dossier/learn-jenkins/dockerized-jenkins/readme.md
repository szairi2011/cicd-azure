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


  ```sh
  ## If you want to set all of your branches to automatically use this remote repository when you use git pull, add --set-upstream to the push:
  $ git push --all -u origin
  ```

## Setup a Jenkins ephemeral Docker agent:
1. The following tutorial helped setting the Docker agent -- https://devopscube.com/docker-containers-as-build-slaves-jenkins/
2. Finally, I switched back to use this ssh agent instead -- https://hub.docker.com/r/jenkins/ssh-agent/ --> It contains the details on how to spin up a new container for a Jenkins Node, or how to dynamically provisin it as a Docker cloud agent. It also highlights how to extend and build a custom agent e.g. to include Additional build tools like Maven, Git, etc.

NB: I have used the unix socket instead of the Daemon tcp url; unix:///var/run/docker.sock. The reason being the Jenkins controller is living inside a containerized env., which does not have access to the host network and hence can't resolve the Daemon Rest API endpoint over tcp://emea-tun-ptds01:2375.

## 