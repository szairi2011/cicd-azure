# Anigaita Task Management Monorepo

This monorepo contains both the frontend and backend code for the Anigaita Task Management system, along with shared resources.

## Project Structure

```
/monorepo-root
├── README.md
├── docker-compose.yml
├── frontend/
│   ├── angular.json
│   ├── package.json
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── styles/
│   └── README.md
├── backend/
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   └── test/
│   └── README.md
└── shared/
    ├── models/
    ├── utilities/
    └── README.md
```

## Running the Project

### Prerequisites
- Node.js 18+ and npm
- Java 17 JDK
- Docker and Docker Compose (optional)

### Running with Docker
```bash
docker-compose up -d
```
- Frontend: http://localhost:4200
- Backend API: http://localhost:8080

### Running the Frontend
```bash
cd monorepo-root/frontend
npm install
npm start
```
The UI will be available at http://localhost:4200

### Running the Backend
```bash
cd monorepo-root/backend
./mvnw spring-boot:run
```
The API will be available at http://localhost:8080

## Shared Directory
The `shared/` directory contains reusable models and utilities for both the frontend and backend.

## License
MIT
