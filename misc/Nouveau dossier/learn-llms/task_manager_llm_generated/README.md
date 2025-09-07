# Anigaita Task Management

A modern task management system with an Angular frontend and Spring Boot backend.

![Task Management UI](https://placeholder.com/task-management-ui)

## Project Structure

This is a mono repo containing both frontend and backend code:

- `/frontend` - Angular application
- `/backend` - Spring Boot application
- `docker-compose.yml` - Docker configuration for running the entire stack

## Features

- Task management with categories
- User assignment and tracking
- Calendar integration
- Progress visualization
- Responsive UI based on the design mock

## Prerequisites

- Node.js 18+ and npm
- Java 17 JDK
- Docker and Docker Compose (optional)

## Development Setup

### Running the Backend

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at http://localhost:8080

### Running the Frontend

```bash
cd frontend
npm install
npm start
```

The UI will be available at http://localhost:4200

### Running with Docker

```bash
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080
- H2 Database Console: http://localhost:8080/h2-console

## API Documentation

### Task Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/tasks | Get all tasks |
| GET | /api/tasks/{id} | Get task by ID |
| POST | /api/tasks | Create a new task |
| PUT | /api/tasks/{id} | Update a task |
| DELETE | /api/tasks/{id} | Delete a task |
| GET | /api/tasks/completed | Get completed tasks |
| GET | /api/tasks/incomplete | Get incomplete tasks |
| GET | /api/tasks/assignee/{id} | Get tasks by assignee |
| GET | /api/tasks/category/{category} | Get tasks by category |
| GET | /api/tasks/date-range?start=&end= | Get tasks within date range |

## Database Schema

### Task

| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key |
| title | String | Task title |
| description | String | Task description |
| completed | Boolean | Task completion status |
| dueDate | LocalDateTime | Task due date |
| category | String | Task category |
| assignee_id | Long | Foreign key to User |

### User

| Field | Type | Description |
|-------|------|-------------|
| id | Long | Primary key |
| name | String | User name |
| email | String | User email |
| avatar | String | User avatar URL |

## License

MIT
