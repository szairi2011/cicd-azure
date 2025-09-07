FROM openjdk:17-alpine

COPY target/fraud-detection-service-1.0.jar fraud-detection-service-1.0.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar","/fraud-detection-service-1.0.jar"]