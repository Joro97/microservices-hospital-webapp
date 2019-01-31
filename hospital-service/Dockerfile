FROM openjdk:8-jdk-alpine
ADD /target/hospital-microservice.jar hospital-microservice.jar
EXPOSE 8000
ENTRYPOINT ["java","-jar","hospital-microservice.jar"]