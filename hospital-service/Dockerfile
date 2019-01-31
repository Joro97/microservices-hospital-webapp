FROM openjdk:8-jdk-alpine
ADD /target/hospital-microservice.jar hospital-microservice.jar
ADD "/src/main/resources" "/src/main/resources/"
EXPOSE 8000
ENTRYPOINT ["java","-jar","hospital-microservice.jar"]
