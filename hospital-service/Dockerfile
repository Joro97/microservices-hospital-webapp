FROM openjdk:8-jdk-alpine
COPY /target/hospital-microservice.jar hospital-microservice.jar
COPY "/src/main/resources" "/src/main/resources/"
EXPOSE 8000
ENTRYPOINT ["java","-jar","hospital-microservice.jar"]
