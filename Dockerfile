FROM maven:3.9.12-eclipse-temurin-25-noble AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:25-rc-jdk-slim
COPY --from=build /target/solarchargecalculator-0.0.1-SNAPSHOT.jar solarchargecalculator.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "solarchargecalculator.jar"]