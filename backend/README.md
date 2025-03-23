# Backend

## Discription
This is a simple Spring Boot application for flight bookings.
The application allows users to search for available flights and make bookings through a REST API.

## How to Run the Applicationz

### Prerequisites

Install and run Docker Desktop.

Ensure you have Java 21 installed.

## Running the Application

1. Clone the Repository:

   ```git clone https://github.com/arhrul/CGI_summer_internship_test_task.git```

   ```cd backend```

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

4. Start the database with Docker:

   ```docker-compose up```

   - This will launch PostgreSQL inside a Docker container.

   - The database will be available at `localhost:5432.

5. Verify that PostgreSQL is running:

   ```docker ps```

6. Run the backend locally:

In a new terminal window, navigate to the project directory and start the backend:

   ```./gradlew bootRun```

   - The backend will now be available at http://localhost:8080.


7. Verify Database Connection:

   You can verify the PostgreSQL database is running correctly by connecting to it using a database client or running the following command:

   ```docker exec -it airplane-db psql -U admin -d airplane```


## Building the Application
To build the project, first ensure the database is running. You can either:

1. Start the database with Docker Compose:

   ```docker compose up postgres```

2. Then, build the project using Gradle:

   ```./gradlew build```

The built JAR file will be located in the build/libs directory.