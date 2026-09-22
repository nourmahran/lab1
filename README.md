# Lab 1 - Todo Filters

## What is finished

- Added filtering to `getTodos` using the `done` query parameter.
- Added All, Active and Done buttons in the frontend.
- Updated `fetchTodos` to send the selected filter to the backend.
- The list reloads when the filter changes and after adding, editing or deleting a task.
- Fixed import names that did not match the capitalization of the files.

All returns every task. Active sends `done=false`, and Done sends `done=true`. With no parameter, the backend still returns everything. The values from the URL are strings, so they are converted to booleans before querying MongoDB.

## Running the app

Use Node.js 22.12 or newer and start MongoDB locally on port 27017.

In one terminal:

```sh
cd backend
npm ci
node server.js
```

In another terminal:

```sh
cd frontend
npm ci
npm run dev
```

Open http://localhost:5173. The backend runs on port 3000 and uses the `todolist` database.

## Checking the filters

Add two tasks and mark one as done. All should show both, Active should show only the unfinished task, and Done should show only the finished one. Completing a task in Active should remove it from that view. A task added while viewing Done should only appear under All or Active.

The build, lint, API and browser checks passed with test data. The connection to a real MongoDB database still needs to be checked locally.

Filtering is done on the server as required. This avoids downloading all tasks, but needs a request each time the filter changes. Filtering in React would switch views faster after loading all the tasks, but would require downloading the full list first.
