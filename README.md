## Project Explanation Video
https://github.com/yash1880/Todo-List/blob/d3402fe083f3a6c13c79c6b39d975df02c634e96/My%20project%201%202026-07-02_19-43-04%20(1)%20(1).mp4

# TodoApp

A simple Todo application built with Node.js, Express, and EJS. It uses in-memory storage for tasks and includes basic CRUD operations: create, read, update, delete, and status cycling.

## Features

- Dashboard listing all tasks
- Add new tasks
- Edit existing tasks
- Delete tasks
- Cycle task status between Pending, In Progress, and Completed
- Statistics summary for total, pending, in progress, and completed tasks

## Tech Stack

- Node.js
- Express
- EJS
- HTML/CSS

## Project Structure

- `app.js` - Main server and routing logic
- `package.json` - Project metadata and dependencies
- `views/` - EJS templates for rendering pages
- `public/` - Static assets such as CSS

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the app:

```bash
npm start
```

3. Open your browser and visit:

```text
http://localhost:3000
```

## Development

To run the server with live reload using `nodemon`:

```bash
npm run dev
```

## Notes

- This app stores tasks in memory, so data is lost when the server restarts.
- The application is intended as a learning/demo project and does not include a database.

## License

This project is licensed under ISC.
