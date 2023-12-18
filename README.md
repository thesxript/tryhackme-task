# Task Management Web Application

This is a full-stack web application built for managing tasks. It allows users to create, read, update, and delete tasks. The application is developed using Node.js, Express, React, and MongoDB.

## Features

- Create a new task using a form.
- Update existing tasks.
- Delete tasks.
- Retrieve a list of tasks.
- User authentication and authorization for API endpoints.
- Secure API implementation to protect against common web application attacks.
- Pagination for the table of tasks.

## Technologies Used

### Backend:
- Node
- Express

### Frontend:
- React

### Database:
- MongoDB

### Authentication and Authorization:
- JSON Web Tokens (JWT)

### Version Control:
- Git (Hosted on GitHub)

## Setup Instructions

### Frontend Setup:
  - cd /client
  - Run
    ```shell
     npm install
    ```
  - Run
    ```shell
     npm run dev
    ```
  - Server will start at http://localhost:5173
  
### Backend Setup:
  - Install Docker
  - Install MongoDB
  - cd /api
  - Run 
    ```shell
     docker compose build --no-cache
    ```
  - Run
    ```shell
     docker compose up
    ```
  - Server will start at http://localhost:3000

### Database Setup:
  - Local
    - Install MongoDB
    - Install MongoDB Compass
    - Connect to your local MongoDB
    - Connecttion String:- mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2
  - Production
    - Update the DB_CONNECT in .env with your cluster
    - Start the server

5. Access the Application:

- Open your web browser and visit http://localhost:5173 to access the application.

## Backend
The backend of the application is built using Node.js and Express. It provides the API endpoints for managing tasks.

The backend directory contains the following files and folders:

- index.ts: The entry point of the backend application.

- routes/: Defines the routes and handlers for the following:-
  - /auth.ts: Defines the routes and handlers for the auth-related API
  - /users.ts: Defines the routes and handlers for the user-related API
  - /tasks.ts: Defines the routes and handlers for the task-related API

- services/: Defines the servics and handlers for the following:-
  - /auth.ts: Defines the business logic for auth-related API
  - /user.ts: Defines the business logic for user-related API
  - /task.ts: Defines the business logic for task-related API

- controllers/: Contains the controller functions for the following.
  - /auth.ts: controller functions for handling the logic of auth operations.
  - /user.ts: controller functions for handling the logic of user operations.
  - /tasks.ts: controller functions for handling the logic of task operations.

- models/: Defines the model for the follwoing to interacting with the MongoDB database.
  - Task.ts: Defines the task schema
  - User.ts: Defines the user schema

- middleware/: Defines the middleware functions for the follwoing
  - /auth.ts: Middleware for authentication and authorization.
  - /authValidation.ts: Middleware for checking validations
  - /validateResult.ts: Middleware for checking the validattion result.
  - /errorHandler.ts: Error handling middleware.

- config/: Defines the configuration for database and passport

- utils/error/: Defines the custom errors.
  - /app-errors: Defines the custom error classes.
  - /errors-code: Defined all error codes.
  - /errors-status-code: Defines all the status code

## Usage

Add your application configuration to your `.env ` file in the both api and client of your project by switching folders and then running following command:

```shell
cp .env.example .env
```

## Security Considerations
The application implements secure authentication and authorization using JSON Web Tokens (JWT). Proper validation and sanitization of user inputs are performed to prevent common web application attacks, such as cross-site scripting (XSS) and SQL injection.
