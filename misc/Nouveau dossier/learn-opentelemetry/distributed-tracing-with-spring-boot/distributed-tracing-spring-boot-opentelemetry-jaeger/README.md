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
$ docker-compose build
$ docker-compose up
```

## Evaluate the application
1. After deploying with docker-compose as stated above, we need to send few requests to 
   the following endpoint "http://emea-tun-ptds01:8083/service/path1" --> For this a postman endpont has been created called
   opentelemetry-jaeger-distributed-tracing
2. Navigate to Jager portal under http://emea-tun-ptds01:16686/, and from the Service dropdown element, select service-1. We should see some distributed traces
3. NB: Traces are an alternate 404 error and a success response to show case the traces use cases