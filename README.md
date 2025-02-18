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
Setup:

Setting up the PostgreSQL server:
1. Install PostgreSQL 17+ if you haven't already
2. In the root directory, login to PostgreSQL using the following command, replacing <username> with your PostgreSQL username:
```
psql -U <username>
```
3. Create a db, replacing <dbname> with your desired database name.
```
createdb <dbname>
```
4. Create the users table by pasting this command:
```
CREATE TABLE users (    id SERIAL PRIMARY KEY,    username VARCHAR(50) UNIQUE NOT NULL,    password_hash VARCHAR(255) NOT NULL);
```
5. In ./backend/.env.example, update DB_USER, DB_PASSWORD and DB_NAME with your PSQL username, password and database name respectively.
```
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=login_database
```
Make sure to rename .env.example to .env!


