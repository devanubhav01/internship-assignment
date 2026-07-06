# To-Do List REST API

Express + MongoDB API for managing tasks — create, read, update, and delete.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env` and point `MONGO_URI` at your MongoDB instance (local or Atlas).

Start MongoDB locally (if not using Atlas):

```bash
mongod
```

Run the server:

```bash
npm run dev     # with nodemon, auto-restarts on changes
# or
npm start
```

Server runs at `http://localhost:5000`.

## Endpoints

| Method | Endpoint          | Description                          |
|--------|-------------------|--------------------------------------|
| POST   | `/api/tasks`      | Create a task                        |
| GET    | `/api/tasks`      | Get all tasks (optional `?completed=true`) |
| GET    | `/api/tasks/:id`  | Get a single task                    |
| PUT    | `/api/tasks/:id`  | Update a task                        |
| DELETE | `/api/tasks/:id`  | Delete a task                        |

### Task shape

```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

`title` is required. `description` and `completed` are optional.

## Testing with Postman

1. Open Postman and create a new **Collection** called "To-Do List API".
2. Set the base URL to `http://localhost:5000`.

### Create a task
- Method: `POST`
- URL: `{{baseUrl}}/api/tasks`
- Body → raw → JSON:
  ```json
  { "title": "Write project report", "description": "Due Friday" }
  ```
- Expected: `201 Created`, returns the new task with an `_id`.

### Get all tasks
- Method: `GET`
- URL: `{{baseUrl}}/api/tasks`
- Expected: `200 OK`, array of tasks.

### Get one task
- Method: `GET`
- URL: `{{baseUrl}}/api/tasks/<paste an _id here>`

### Update a task
- Method: `PUT`
- URL: `{{baseUrl}}/api/tasks/<id>`
- Body → raw → JSON:
  ```json
  { "completed": true }
  ```
- Expected: `200 OK`, returns the updated task.

### Delete a task
- Method: `DELETE`
- URL: `{{baseUrl}}/api/tasks/<id>`
- Expected: `200 OK`, `{ "message": "Task deleted", "id": "..." }`.

Tip: in Postman, set a collection variable `baseUrl = http://localhost:5000` so
you can reuse `{{baseUrl}}` across requests.
