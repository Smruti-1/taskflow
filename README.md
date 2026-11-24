# TaskFlow

A task manager built with React and Vite. Add, edit, complete and delete tasks, search them, and filter by status. Tasks persist in the browser.

**Live demo:** _add your Vercel/Netlify link_

## Features
- Create, edit, complete and delete tasks (full CRUD)
- Form validation with clear error messages (required, 3-80 characters)
- Search and filter (all / active / completed)
- Empty state and input validation
- Persistence with localStorage
- Responsive layout, keyboard focus styles, automatic dark mode

## Tech
React 18 (hooks: useState, useEffect, useMemo), Vite, plain CSS.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
Push to GitHub, import the repo on Vercel or Netlify. Build command `npm run build`, output directory `dist`.

## What I'd add next
Drag-and-drop ordering, due dates, and unit tests with Vitest.
