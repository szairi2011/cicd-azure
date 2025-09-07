#FROM adoptopenjdk/openjdk17:alpine
FROM openjdk:17-alpine

COPY target/distributed-service-0.0.1-SNAPSHOT.jar spring-cloud-open-telemetry.jar

EXPOSE 8090

ENTRYPOINT ["java","-jar","/spring-cloud-open-telemetry.jar"]