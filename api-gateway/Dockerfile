FROM openjdk:8-jdk-alpine
COPY /target/api-gateway.jar api-gateway.jar
COPY "/src/main/resources" "/src/main/resources"
EXPOSE 8091
ENTRYPOINT ["java","-jar","api-gateway.jar"]
