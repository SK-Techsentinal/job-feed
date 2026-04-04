# Technical Design — Job Feed with Server-Side Filtering

**Stack:** NestJS (Backend) · React + Vite + TypeScript (Frontend)

---

## Overview

We are building a "Browse Jobs" page for a remote work platform. Users filter jobs by **Category** and **Type**, navigate with **Pagination**, and all filters are always reflected in the **URL**.

All filtering is **server-side** — the frontend passes filter values as query parameters, and the backend returns only the matching results plus pagination metadata.

---

## BACKEND

### 1. Endpoint Design

**`GET /jobs`**

| Query Param | Type   | Default | Description                           |
|-------------|--------|---------|---------------------------------------|
| `page`      | number | `1`     | Which page to return                  |
| `limit`     | number | `10`    | How many jobs per page                |
| `category`  | string | —       | Filter by category (e.g. Engineering) |
| `type`      | string | —       | Filter by job type (e.g. Full-time)   |

**Example:**
```
GET /jobs?category=Engineering&type=Contract&page=2
```

**Filtering logic:**
1. Start with the full in-memory list
2. If `category` provided → keep only jobs where `job.category` matches (case-insensitive)
3. If `type` provided → keep only jobs where `job.type` matches (case-insensitive)
4. Paginate the result by slicing the filtered array

**Pagination math:**
```
totalPages = Math.ceil(filteredJobs.length / limit)
data       = filteredJobs.slice((page - 1) * limit, page * limit)
```

---

### 2. DTO Definitions

**Request Query DTO**
```ts
class GetJobsQueryDto {
  page?:     number  // default 1, integer ≥ 1
  limit?:    number  // default 10, integer ≥ 1
  category?: string
  type?:     string
}
```

**Job Model**
```ts
interface Job {
  id:       string
  title:    string
  company:  string
  category: string  // e.g. "Engineering", "Design"
  type:     string  // e.g. "Full-time", "Contract"
  location: string
  postedAt: string  // ISO date string
}
```

**Response DTO**
```ts
interface JobsResponse {
  data: Job[]
  meta: {
    total:      number  // total matching jobs
    page:       number  // current page
    limit:      number  // items per page
    totalPages: number
  }
}
```

---

### 3. Filtering Strategy

All filtering logic lives inside **`JobsService`**. The controller only handles HTTP — no logic there.

Filters are chained sequentially on the in-memory array, which mirrors how a real ORM query builder chains `.where()` conditions. Switching to a real database later requires minimal changes.

---

### 4. Edge Cases

| Scenario | Handling |
|---|---|
| `page=999` (beyond data) | Returns `data: []` with correct `meta`. Not an error. |
| `page=-1` or `page=abc` | `ValidationPipe` returns `400 Bad Request` automatically |
| Unknown `category` / `type` | Returns empty results gracefully — no error |
| No filters provided | Returns all jobs, paginated |
| Empty dataset | Returns `data: []`, `meta.total = 0`, `meta.totalPages = 0` |

---

## FRONTEND

### 1. Component Structure

```
JobsPage                  ← owns all state, fetches data, reads/writes URL
├── FiltersSidebar        ← Category + Type dropdowns
│   └── FilterSelect      ← reusable dropdown (used for both filters)
├── JobsList              ← renders cards, loading skeleton, empty state, error
│   └── JobCard           ← single job card
└── Pagination            ← previous/next controls
```

Each component is **props-only**. All state flows down from `JobsPage`.

---

### 2. URL Synchronization

**The URL is the single source of truth.**

```
/jobs?category=Engineering&type=Contract&page=2
```

- On mount, `JobsPage` reads state from `useSearchParams()`
- Filter changes call `setSearchParams(...)` to update the URL
- A `useEffect` watches URL params and re-fetches on change
- No separate filter state variable — the URL *is* the state

**Why:** Bookmarks restore exact view. Browser Back button works. Zero state duplication.

---

### 3. Fetching Strategy

- `isLoading = true` before fetch → skeleton cards render (no flicker, no layout jump)
- Filter changes reset page to `1` automatically
- Errors are caught and stored in state → shown as inline message
- Empty results show a friendly "no jobs found" message

---

### 4. Reusability

`FilterSelect` is a generic dropdown:

```ts
interface FilterSelectProps {
  label:    string
  value:    string
  options:  { label: string; value: string }[]
  onChange: (value: string) => void
}
```

Both Category and Type use the same component with different props. Adding a third filter requires no new component. `Pagination` is also fully decoupled — knows nothing about filters or URLs.

---

## Summary

| Concern | Decision |
|---|---|
| Filtering | Server-side only |
| State management | URL search params (no Redux/Zustand) |
| Source of truth | URL |
| Data layer | Mock in-memory array, structured for easy DB swap |
| Invalid input | `ValidationPipe` (400) + graceful empty for unknown values |
| TypeScript | Strict, no `any` |
| External libraries | Minimal — React Router only |
