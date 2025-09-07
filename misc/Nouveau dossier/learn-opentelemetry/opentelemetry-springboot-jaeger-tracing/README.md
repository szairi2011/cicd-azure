# Distributed Tracing with OpenTelemetry and Jaeger

In this project I have figured out how we can integrate distributed tracing in a Spring Boot application. 
We are using OpenTelemetry to export traces to Jaeger.

You can read about this on my website [https://refactorfirst.com](https://refactorfirst.com)

Once you build the application using `mvn clean verify`, You can start the application as two service instances.

Service 1
```
java -jar \
target/Distributed-Service-0.0.1-SNAPSHOT.jar \
--spring.application.name=Service-1 \
--server.port=8080
```

Service 2
```
java -jar \
target/Distributed-Service-0.0.1-SNAPSHOT.jar \
--spring.application.name=Service-2 \
--server.port=8090
```

## Deploy with Docker-compose

First we need to run mvn clean package to get the last binary. 
Then, run below commands to build a new image locally, and spin up the containers. 

```sh
$ docker-compose down --remove-orphans
```

```sh
$ docker-compose build
```

```sh
$ docker-compose up
```

## Use the demo app

    1. Browse to Jayer tracing UI -- 'http://<host_name>:16686'
    2. Invoke the service1 controller on path1: 'http://<service1_host_name>:8083/service/path1'