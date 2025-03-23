# Backend

## Discription
This is a simple Spring Boot application for flight bookings.
The application allows users to search for available flights and make bookings through a REST API.

## How to Run the Application

## Option 1: Run with Docker Compose

1. Clone the Repository:

   ```git clone <your repository URL>```

   ```cd <path to your project>```

2. Open the docker-compose.yml file and ensure the database credentials are correct:
    ```
    postgres:
    image: postgres
    container_name: airplane-db
    environment:
        POSTGRES_USER: admin
        POSTGRES_PASSWORD: password123
        POSTGRES_DB: airplane
    ```

3. Ensure the same credentials are reflected in the src/main/resources/application.properties file:

   ```spring.datasource.url=jdbc:postgresql://localhost:5432/airplane```

   ```spring.datasource.username=admin```

   ```spring.datasource.password=password123```

4. Start only the PostgreSQL container:

   ```docker-compose up postgres```

5. Verify that PostgreSQL is running:

   ```docker ps```

6. Now that the database is running, you can build the project:

   ```./gradlew build```


7. Once the JAR file is built successfully, you can build and run the entire application with Docker:

   ```docker compose up --build```

   The PostgreSQL service will run on localhost:5432.
   The Backend service will be available at http://localhost:8080.

8. Verify Database Connection:

   You can verify the PostgreSQL database is running correctly by connecting to it using a database client or running the following command:

   ```docker exec -it airplane-db psql -U admin -d airplane```

## Option 2: Run PostgreSQL in Docker, Backend Locally with Gradle

1. Ensure you have Java 21 and Gradle installed.


2. Clone the repository:

   ```git clone <your repository URL>```

   ```cd <path to your project>```

3. Open the docker-compose.yml file and ensure the database credentials are correct and the same credentials are reflected in the src/main/resources/application.properties file (**Option 1**, 2-3 steps).

4. Start PostgreSQL Only:

   ```docker compose up postgres```

5. Verify the Database:

   You can verify that PostgreSQL is running by checking if the container is active:
   ```docker ps```

6. Now that the database is running, you can build the project:

   ```./gradlew build```

7. After building the project, you can go to src/main/java/BackendApplication.java and run it to start the application.

8. (Optional) Instead of doing steps 6-7, you can run the Backend Locally:

   ```./gradlew bootRun```

   The backend service will now be accessible at http://localhost:8080, connecting to the PostgreSQL instance running in Docker.


## Building the Application
To build the project, first ensure the database is running. You can either:

1. Start the database with Docker Compose:

   ```docker compose up postgres```

2. Then, build the project using Gradle:

   ```./gradlew build```

The built JAR file will be located in the build/libs directory.