# Job Feed — Full Stack Assignment

A "Browse Jobs" page with server-side filtering, pagination, and URL synchronization.

**Stack:** NestJS · React · Vite · TypeScript

---

## Project Structure

```
/
├── backend/               ← NestJS API
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       └── jobs/
│           ├── jobs.module.ts
│           ├── jobs.controller.ts
│           ├── jobs.service.ts
│           ├── job.interface.ts
│           └── get-jobs-query.dto.ts
│
├── frontend/              ← React + Vite app
│   └── src/
│       ├── main.tsx
│       ├── App.tsx
│       ├── index.css
│       ├── api/jobs.ts
│       ├── types/jobs.ts
│       ├── pages/JobsPage.tsx
│       └── components/
│           ├── FilterSelect.tsx
│           ├── FiltersSidebar.tsx
│           ├── JobCard.tsx
│           ├── JobsList.tsx
│           └── Pagination.tsx
│
└── PHASE1_Technical_Design.md
```

---

## Requirements

- **Node.js** v18 or higher — download at https://nodejs.org
- **npm** (comes with Node.js)

---

## Setup — Step by Step

### 1. Start the Backend

Open a terminal and run:

```bash
cd backend
npm install
npm run start:dev
```

You should see:
```
✅ Backend running at http://localhost:3000
```

Test it works: open http://localhost:3000/jobs in your browser.
You should see JSON with jobs data.

---

### 2. Start the Frontend

Open a **second terminal** (keep the backend running) and run:

```bash
cd frontend
npm install
npm run dev
```

You should see:
```
VITE ready at http://localhost:5173
```

Open http://localhost:5173 in your browser. You should see the jobs page.

---

## How It Works

### API Endpoint

```
GET http://localhost:3000/jobs
```

| Query Param | Example        | Default |
|-------------|----------------|---------|
| `page`      | `page=2`       | `1`     |
| `limit`     | `limit=5`      | `10`    |
| `category`  | `category=Engineering` | — |
| `type`      | `type=Contract` | —      |

**Example:**
```
GET /jobs?category=Engineering&type=Contract&page=1
```

**Response:**
```json
{
  "data": [ { "id": "3", "title": "Backend Engineer", ... } ],
  "meta": { "total": 5, "page": 1, "limit": 10, "totalPages": 1 }
}
```

---

## Key Design Decisions

- **URL is the source of truth** — filters and page are stored in the URL, not component state. Bookmarking or sharing the URL always restores the exact view.
- **Server-side filtering** — the backend filters data; the frontend only shows what it receives.
- **Skeleton loading** — grey placeholder cards show while fetching, preventing layout flicker.
- **No `any`** — strict TypeScript throughout.
- **Minimal dependencies** — only React Router added beyond the required stack.
