# Student API

Simple REST API built with Express and MySQL for creating, listing, and deleting users.

## Stack

- Node.js
- Express
- MySQL (`mysql2`)

## Project Structure

```text
student-api/
├── config/
│   └── db.js
├── index.js
├── json-endpoints-config.js
├── zombie.js
├── package.json
└── package-lock.json
```

## Current API

The main server entry point is `index.js` and runs on `http://localhost:3000`.

### Endpoints

#### `POST /user`

Create a new user.

Request body:

```json
{
  "fullname": "Jane Doe",
  "username": "janedoe",
  "age": 22,
  "gender": "female"
}
```

Success response:

```json
{
  "id": 1,
  "fullname": "Jane Doe",
  "username": "janedoe",
  "age": 22,
  "gender": "female"
}
```

#### `GET /users`

Returns all rows from the `users` table.

#### `DELETE /user/:id`

Deletes a user by database `id`.

## Database Setup

The app connects to MySQL using the settings in `config/db.js`:

- Host: `localhost`
- User: `root`
- Password: empty string
- Database: `internship`

Create the database and table before starting the server:

```sql
CREATE DATABASE internship;

USE internship;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(50) NOT NULL
);
```

If your local MySQL credentials are different, update `config/db.js`.

## Installation

```bash
npm install
```

## Run

Start the server:

```bash
npm start
```

Run in development mode with auto-reload:

```bash
npm run dev
```

When the server starts successfully, it listens on:

```text
http://localhost:3000
```

## Example cURL Commands

Create a user:

```bash
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"fullname":"Jane Doe","username":"janedoe","age":22,"gender":"female"}'
```

Get all users:

```bash
curl http://localhost:3000/users
```

Delete a user:

```bash
curl -X DELETE http://localhost:3000/user/1
```

## Notes

- `index.js` is the active API server.
- `json-endpoints-config.js` and `zombie.js` appear to be practice or auxiliary files and are not started by the default scripts.
- There are currently no automated tests or environment variable configuration in the project.
