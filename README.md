# microservices-hospital-webapp
Cloud native webapp that solves the event scheduling problem for a hospital

# Demo

1. docker-compose -f docker-compose-demo.yml pull
2. docker-compose -f docker-compose-demo.yml up

# Build

to build the project:
- mvn clean install

## Release

to release docker images, used by docker-compose:
- mvn install -P release

to release docker images, used by docker-compose for a single module:
- mvn install -pl module_name -P release

