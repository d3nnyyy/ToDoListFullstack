# ToDo List Application

The ToDo List Application is a simple web application that allows users to manage their tasks and stay organized.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- View all tasks
- View a specific task by its ID
- View tasks with today's deadline
- Add a new task
- Update an existing task
- Delete a task
- Task cleanup: completed tasks older than one day are automatically deleted.

## Technologies

The application is built using the following technologies:

- Backend: Java Spring Boot, Spring Data JPA
- Frontend: React.js, React Router, Bootstrap
- Database: MySQl
- Build Tool: Maven
- Other Dependencies: react-confirm-alert, date-fns

## Getting Started

To get the application running on your local machine, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone https://github.com/d3nnyyy/ToDoListFullstack.git
```
Open the backend project in your preferred Java IDE (e.g., IntelliJ IDEA, Eclipse).

Run the Spring Boot application to start the backend server.

Open the frontend project in your preferred code editor.

Install the required dependencies:

```bash
npm install
```

Start the frontend development server:
```bash
npm start
```

Now, you can access the application in your web browser at `http://localhost:3000`.

## Usage

Once the application is running, you can use the ToDo List application to manage your tasks. 

The application's navbar provides easy navigation to different sections, such as **Home** to view all tasks, **Today** to view tasks with today's deadline, and an **Add Task** button to create new tasks.

The application automatically cleans up completed tasks older than one day.

## API Endpoints

The backend provides the following API endpoints:

- `GET /todo`: Get all tasks
- `GET /todo/{id}`: Get a specific task by its ID
- `GET /todo/today`: Get tasks with today's deadline
- `GET /todo/done-today`: Get tasks completed today
- `POST /todo`: Create a new tasks
- `PUT /todo/{id}`: Update an existing task
- `DELETE /todo/{id}`: Delete a task by its ID

## Screenshots 



## Contributing

Contributions are welcome! If you find any bugs or want to add new features, please open an issue or submit a pull request.

## Contact
For any inquiries or questions, please contact <d.tsebulia@gmail.com>.
