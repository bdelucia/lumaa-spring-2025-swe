# Full-Stack Coding Challenge

**Deadline**: Sunday, Feb 23th 11:59 pm PST

---

## Overview

Create a “Task Management” application with **React + TypeScript** (frontend), **Node.js** (or **Nest.js**) (backend), and **PostgreSQL** (database). The application should:

1. **Register** (sign up) and **Log in** (sign in) users.
2. After logging in, allow users to:
   - **View a list of tasks**.
   - **Create a new task**.
   - **Update an existing task** (e.g., mark complete, edit).
   - **Delete a task**.

Focus on **correctness**, **functionality**, and **code clarity** rather than visual design.  
This challenge is intended to be completed within ~3 hours, so keep solutions minimal yet functional.

---
# Setup:

## Setting up the PostgreSQL server:
1. Install PostgreSQL 17+ if you haven't already
2. In the root directory, login to PostgreSQL using the following command, replacing <username> with your PostgreSQL username:
```
psql -U <username>
```
3. Create a db, replacing <dbname> with your desired database name.
```
createdb <dbname>
```
4. Connect to the created database:
```
\c <dbname>
```
5. Create the users table by pasting this command:
```
CREATE TABLE users (    id SERIAL PRIMARY KEY,    username VARCHAR(50) UNIQUE NOT NULL,    password_hash VARCHAR(255) NOT NULL);
```
6. In ./backend/.env.example, update DB_USER, DB_PASSWORD and DB_NAME with your PSQL username, password and database name respectively.
```
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=login_database
```
Make sure to rename .env.example to .env!

## Installing Node.js packages
1. In the root directory of the project, type
```
npm install
```
to install all Node packages for this project.

## Running the Web App
1. Complete the PostgreSQL as detailed above. Make sure PostgreSQL 17 is running under Services (Windows Search Bar > Services)
2. Run the backend with the following commands:
```
cd backend
node server.js
```
You should see these messages in the terminal:
```
Server running on port 3001
Database connected successfully
```
If not, something is wrong with your env file or database set up.
***Make sure your PSQL password is in quotes if it has special characters, and that it is in the ./backend directory!!!***
3. Keeping the backend terminal open in the background, create a new terminal to run the front-end:
```
cd auth-frontend
npm start
```
After running npm start, a tab in your browser should open up and display the app! If not, head to http://localhost:3000/ in any browser.
