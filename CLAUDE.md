# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Start with nodemon (auto-reload on file changes)
npm start          # Start for production
```

No test suite is configured.

## Environment

Requires a `.env` file at the project root with:
- `MONGO_URI` — MongoDB Atlas connection string
- `PORT` — Server port (defaults to `3000`; Render sets this automatically)

## Architecture

Minimal Express + Mongoose REST API for a todo app. No controllers layer — route handlers in [routes/tasks.js](routes/tasks.js) contain all business logic directly.

**Request flow:** `server.js` → Express router → `routes/tasks.js` → Mongoose (`models/Task.js`) → MongoDB Atlas

**Model** ([models/Task.js](models/Task.js)):
- `title` (String, required)
- `completed` (Boolean, default `false`)
- `createdAt` (Date, auto-set)

**API** — base path `/api/tasks`:
| Method | Path | Action |
|--------|------|--------|
| GET | `/api/tasks` | List all tasks (newest first) |
| POST | `/api/tasks` | Create task (`{ title }`) |
| PUT | `/api/tasks/:id` | Toggle `completed` |
| DELETE | `/api/tasks/:id` | Delete task |

CORS is enabled globally (no origin restriction), intended to pair with the Angular 19 frontend project.

## Deployment

Deployed on Render. The `PORT` env var is injected by Render at runtime, which is why `server.js` uses `process.env.PORT || 3000`.
