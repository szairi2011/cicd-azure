# jenkins-docker-slave

this repo contains Dockerfile for creating custom Jenkins docker slave.
you need to download the code and perform docker build.

## Youtube tuto
A Toutube video for how to set up a Docker cloud agent for Jenkins using a ubuntu 18.4 docker image is available under -- 
https://www.youtube.com/watch?v=kHJGYTcLNj0


## Build the image
To build the image on Docker host you need to run the following command:

```sh
docker build -t jenkins-maven-ubuntu .
```

## Create a Docker container from the image
Run below command
 ```sh
 docker run -d -p 1234:22 jenkins-maven-ubuntu