# Notes App Backend — Mini Project

A backend API for a notes-taking app: users register/log in, then create,
read, update, and delete their own notes. Every note route is protected with
JWT authentication, and notes are always scoped to the logged-in user — one
user can never see or edit another user's notes.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
- `MONGO_URI` → your MongoDB connection string
- `JWT_SECRET` → a long, random string

Run it:

```bash
npm run dev
# or
npm start
```

Server runs at `http://localhost:5002`.

## Architecture

```
models/User.js      — user account, password hashed with bcrypt pre-save
models/Note.js       — note document, has an `owner` field (ref: User)
middleware/authMiddleware.js — verifies the JWT, attaches req.user.id
controllers/authController.js — register / login, issues JWTs
controllers/noteController.js — CRUD, every query filtered by owner
routes/authRoutes.js  — /api/auth/*
routes/noteRoutes.js  — /api/notes/*  (router.use(protect) — all require a token)
```

## Endpoints

| Method | Endpoint         | Auth required | Description                  |
|--------|------------------|:---:|-------------------------------|
| POST   | `/api/auth/register` | No  | Create an account            |
| POST   | `/api/auth/login`    | No  | Log in, get a JWT            |
| POST   | `/api/notes`         | Yes | Create a note                |
| GET    | `/api/notes`         | Yes | Get all of your notes        |
| GET    | `/api/notes/:id`     | Yes | Get one of your notes        |
| PUT    | `/api/notes/:id`     | Yes | Update one of your notes     |
| DELETE | `/api/notes/:id`     | Yes | Delete one of your notes     |

## Testing with Postman

Set a collection variable `baseUrl = http://localhost:5002`.

### 1. Register
- `POST {{baseUrl}}/api/auth/register`
- Body → raw → JSON:
  ```json
  { "name": "Priya Nair", "email": "priya@example.com", "password": "supersecret123" }
  ```
- Expected: `201 Created`, returns `{ user, token }`. Copy the `token`.

### 2. Login (if you already have an account)
- `POST {{baseUrl}}/api/auth/login`
- Body: `{ "email": "priya@example.com", "password": "supersecret123" }`

### 3. Create a note
- `POST {{baseUrl}}/api/notes`
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  { "title": "Grocery list", "content": "Milk, eggs, spinach" }
  ```
- Expected: `201 Created`, returns the note with `owner` set to your user id.

### 4. Get all your notes
- `GET {{baseUrl}}/api/notes`
- Headers: `Authorization: Bearer <token>`

### 5. Update a note
- `PUT {{baseUrl}}/api/notes/<id>`
- Headers: `Authorization: Bearer <token>`
- Body: `{ "content": "Milk, eggs, spinach, bread" }`

### 6. Delete a note
- `DELETE {{baseUrl}}/api/notes/<id>`
- Headers: `Authorization: Bearer <token>`

### 7. Confirm the JWT protection actually works
- Repeat step 4 **without** the `Authorization` header → expect `401 Unauthorized`.
- Register a **second** user, log in as them, and try `GET /api/notes/<first user's note id>`
  → expect `404 Not Found` (not leaked, just scoped away).

Tip: save the token automatically after register/login using a Postman **Tests** script:
```javascript
const data = pm.response.json();
pm.collectionVariables.set('token', data.token);
```
Then use `Authorization: Bearer {{token}}` on every note request.
