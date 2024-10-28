# Build-Phase
FROM maven:3.8.8-eclipse-temurin-17 AS build

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die pom.xml und lade die Maven-Abhängigkeiten herunter (Caching-Schritt)
COPY pom.xml .
RUN mvn dependency:go-offline

# Kopiere den Rest des Projekts und baue die Anwendung
COPY src ./src
RUN mvn package -DskipTests

# Runtime-Phase
FROM eclipse-temurin:17

# Setze das Arbeitsverzeichnis für den fertigen Container
WORKDIR /app

# Kopiere das gebaute JAR-File aus der Build-Phase
COPY --from=build /app/target/*.jar app.jar

# Expose den Port, auf dem die Spring Boot-Anwendung läuft (Standard 8080)
EXPOSE 8080

# Startet die Anwendung
ENTRYPOINT ["java", "-jar", "/app/app.jar"]