// These types mirror the backend response exactly.
// Strict typing — no "any" anywhere.

export interface Job {
  id: string;
  title: string;
  company: string;
  category: string;
  type: string;
  location: string;
  postedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface JobsApiResponse {
  data: Job[];
  meta: PaginationMeta;
}

export interface JobFilters {
  category: string;
  type: string;
}
