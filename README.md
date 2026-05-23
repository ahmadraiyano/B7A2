# Issue Tracker API

## Project Overview

A RESTful Issue Tracker API built with Node.js, Express, TypeScript, and PostgreSQL. The system allows users to create, update, and manage issues with authentication and role-based authorization.

---

## Live URL

Add your deployed URL here:

https://b7-a2-five.vercel.app/

---

## Features

* User authentication using JWT
* Role-based authorization (`maintainer`, `contributor`)
* Create issues
* Update issues
* Get all issues
* Protected routes with middleware
* PostgreSQL database integration
* Error handling and validation
* TypeScript support

---

## Tech Stack

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL

### Authentication

* JSON Web Token (JWT)

### Other Tools

* pg
* dotenv
* bcrypt
* ts-node-dev

---

## Project Setup

### Clone repository

```bash
git clone <repository-url>
```

Move into project directory:

```bash
cd project-name
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
```

Run development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Start production server:

```bash
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | /api/auth/register | Register user |
| POST   | /api/auth/login    | Login user    |

### Issues

| Method | Endpoint        | Description      | Access     |
| ------ | --------------- | ---------------- | ---------- |
| POST   | /api/issues     | Create issue     | Private    |
| GET    | /api/issues     | Get all issues   | Public     |
| GET    | /api/issues/:id | Get single issue | Public     |
| PATCH  | /api/issues/:id | Update issue     | Protected  |
| DELETE | /api/issues/:id | Delete issue     | Maintainer |

---

## Authorization Rules

### Maintainer

* Can update any issue
* Can manage all resources

### Contributor

* Can create issues
* Can update only their own issues
* Can update only when issue status is `open`

---

## Database Schema Summary

### Users Table

| Field      | Type      |
| ---------- | --------- |
| id         | SERIAL    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| role       | VARCHAR   |
| created_at | TIMESTAMP |

---

### Issues Table

| Field       | Type      |
| ----------- | --------- |
| id          | SERIAL    |
| title       | VARCHAR   |
| description | TEXT      |
| type        | VARCHAR   |
| status      | VARCHAR   |
| user_id     | INTEGER   |
| created_at  | TIMESTAMP |
| updated_at  | TIMESTAMP |

---

## Example Response

```json
{
  "success": true,
  "message": "Issue updated successfully",
  "data": {
    "id": 1,
    "title": "Database connection issue",
    "description": "Pool timeout under load",
    "status": "open"
  }
}
```

---

## Author

Ahmad Raiyan
