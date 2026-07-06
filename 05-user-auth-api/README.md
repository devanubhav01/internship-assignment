# User Authentication API

Express + MongoDB API for user registration and login, with **bcrypt**
password hashing and **JWT**-based authentication.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:
- Point `MONGO_URI` at your MongoDB instance.
- Set `JWT_SECRET` to a long, random string (this signs your tokens — never commit a real one).

Run the server:

```bash
npm run dev
# or
npm start
```

Server runs at `http://localhost:5001`.

## How auth works here

- Passwords are hashed with **bcrypt** in a Mongoose `pre('save')` hook — the
  plaintext password is never stored.
- On successful register/login, the API returns a signed **JWT** containing the
  user's id, expiring after `JWT_EXPIRES_IN` (default 7 days).
- Protected routes use `middleware/authMiddleware.js`, which reads the token
  from an `Authorization: Bearer <token>` header, verifies it, and attaches
  `req.user.id` for the route handler to use.

## Endpoints

| Method | Endpoint          | Auth required | Description                  |
|--------|-------------------|:---:|-------------------------------|
| POST   | `/api/auth/register` | No  | Create a new account         |
| POST   | `/api/auth/login`    | No  | Log in, get a JWT            |
| GET    | `/api/auth/me`        | Yes | Get the logged-in user's profile |

## Testing with Postman

Set a collection variable `baseUrl = http://localhost:5001`.

### Register
- `POST {{baseUrl}}/api/auth/register`
- Body → raw → JSON:
  ```json
  { "name": "Aria Kapoor", "email": "aria@example.com", "password": "supersecret123" }
  ```
- Expected: `201 Created`, returns `{ user, token }`.

### Login
- `POST {{baseUrl}}/api/auth/login`
- Body → raw → JSON:
  ```json
  { "email": "aria@example.com", "password": "supersecret123" }
  ```
- Expected: `200 OK`, returns `{ user, token }`. **Copy the `token` value.**

### Access a protected route
- `GET {{baseUrl}}/api/auth/me`
- Headers tab → add:
  - Key: `Authorization`
  - Value: `Bearer <paste the token here>`
- Expected: `200 OK`, returns the logged-in user's `id`, `name`, `email`.
- Try it **without** the header, or with a wrong token — you should get `401 Unauthorized`.

Tip: In Postman, you can save the token from the login response into a collection
variable automatically using a small script in the **Tests** tab:
```javascript
const data = pm.response.json();
pm.collectionVariables.set('token', data.token);
```
Then use `Authorization: Bearer {{token}}` on protected requests.
