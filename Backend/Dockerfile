# Stage 1: Build application using Java 25
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .

# Java 25 target bytecode build karne ke liye latest JDK 25 EA download & set
RUN curl -s https://download.oracle.com/java/25/latest/jdk-25_linux-x64_bin.tar.gz | tar -xz -C /opt && \
    ENV JAVA_HOME=/opt/jdk-25 && \
    ENV PATH="$JAVA_HOME/bin:$PATH"

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run application using Java 25
FROM ubuntu:24.04
RUN apt-get update && apt-get install -y wget curl tar && rm -rf /var/lib/apt/lists/*
RUN curl -s https://download.oracle.com/java/25/latest/jdk-25_linux-x64_bin.tar.gz | tar -xz -C /opt
ENV JAVA_HOME=/opt/jdk-25
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]