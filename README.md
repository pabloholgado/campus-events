# Campus Events

Campus Events is a web application built with Angular and Node.js for a full-stack web development course.

The Angular frontend shows a click counter with a reset button and a message. The Node.js backend provides routes for a welcome message and the current date and time.

## How to start the server

Open a terminal in the project folder and run:
```
cd server
node hello.js
```
The server runs at http://localhost:3000

Available routes:
- `/` - Welcome message
- `/time` - Current date and time
- Other routes - 404 Not Found

## How to start the client

Open a second terminal in the project folder and run:
```
cd client
npm.cmd install
ng.cmd serve
```

I use the .cmd commands to avoid PowerShell script execution restrictions on my Windows, that I had problems with before.

Open http://localhost:4200 in your browser.

The Node.js server and Angular application run independently.