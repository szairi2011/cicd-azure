# Spring Boot 3 Observability with Grafana Stack

- This project contains the source code for the Youtube demo [Spring Boot 3 Observability with Grafana Stack](https://youtu.be/PT2yZTBnUwQ?feature=shared) video.
- It corresponds also to the tuto [Spring Boot 3 Observability with Grafana Stack](https://programmingtechie.com/2023/09/09/spring-boot3-observability-grafana-stack/)

## Github repo
https://github.com/SaiUpadhyayula/springboot3-observablity/blob/master/docker-compose.yml

We may also run below command:
```sh
$ git remote get-url origin
```

## Build the jars for the microservice
The Docker-compose manifest for this project is suitable for a development environment, where we need to package the jars before deploying them to remote Docker host.
For this, we need to 

1. run the following command on the parent pom:

````shell
$ mvn clean package -DskipTests=true
````
2. Then either build the images

````shell
$ docker compose build
````
## Running the project

To run the project, you need to have Docker and Docker Compose installed. Then, run the following command:

To run the observability backend services and both application µ-serrvices at once, run:

```sh
$ docker-compose up -d
```

NB: The project is self deployable where:
``` 
    - No need to bootstrap the mysql db, thanks to Flywaydb libraries, that integrates with Springboot and initializs/migrate the schemas if needed -- very handy tool
    - we can deploy our 2 µ-service application in a remote Docker host not just locally
```


## Accessing the services
1. Grafana: http://emea-tun-ptds01:3000
2. Prometheus: http://emea-tun-ptds01:9090
3. Tempo: http://emea-tun-ptds01:3110
4. Loki: http://emea-tun-ptds01:3100
5. Fraud detection service: http://emea-tun-ptds01:9071
6. Loan service: http://emea-tun-ptds01:9070

## Visualize the µ-services logs
You can also check the service logs following the application deployment by running the following command:
```sh
docker-compose logs -f -t loan-service fraud-detection-service
```

## Postman
A postman collection containing a GET and a POST requests is created to inspect and create few tracing, metrics, and logs.
It's called [observability_grafana_stack](https://web.postman.co/workspace/My-Workspace~a2e114be-c0f2-4f0e-8be6-bee12739f65e/collection/6610248-a331bc7d-2130-4725-8d33-4279575bf59b?action=share&source=copy-link&creator=6610248)

## Deprovisioning
Once done with the demo up, it is recommended to free up the Docker created artifacts including containers, and volumes.
Afterall, we can re-provision them when needed in a single command, i.e. docker-compose up.
So to free up the resources, we run:

```sh
$ docker-compose down -v
```

## Project Overview

![img.png](img.png)

## Other applications
Another example project of using opentelemetry with jaeger without using Grafana is available under 
"C:\Users\e1079458\work\learn-opentelemetry\distributed-tracing-with-spring-boot\distributed-tracing-spring-boot-opentelemetry-jaeger".
The corresponding README.md is up to date.
