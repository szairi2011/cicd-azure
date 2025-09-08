## Troubleshooting commands:
  - To remove all Docker images that are not attached to any container: 
      $ docker rmi -f `docker imaages -aq`

  - To remove all stopped Docker containers: 
      $ docker rm `docker ps -aq`

  - To go inside a container: 
      $ docker exec -it <contianerid or name>

  - To show the RAM and CPU usage of Docker: 
      $ docker stats [--no-stream] --> --no-stream opetion is to take a snapshot without live updates

  - To check the logs of a container: 
      $ docker logs <container_id_or_name>

  - To build the images if the images do not exist and start the containers: 
      $ docker-compose up

  - To build the images if the images do not exist and start the containers in the background: 
      $ docker-compose up -d

  - To build images before starting containers: 
      $ docker-compose up --build

  - To stop containers and remove containers, networks, volumes, and images created by up: 
      $ docker-compose down
  
      NB: By default docker-compose down does not remove volume to remove use 
        $ docker-compose down -v