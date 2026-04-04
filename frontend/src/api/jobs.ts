import { JobFilters, JobsApiResponse } from '../types/jobs';

const API_BASE = 'http://localhost:3000';

// All API calls go through this one function.
// Returns typed data or throws an error — the caller handles the error state.
export async function fetchJobs(
  filters: JobFilters,
  page: number,
  limit = 10,
): Promise<JobsApiResponse> {
  const params = new URLSearchParams();
  params.set('page', String(page));
  params.set('limit', String(limit));

  // Only add filter params if they have a value
  if (filters.category) params.set('category', filters.category);
  if (filters.type) params.set('type', filters.type);

  const response = await fetch(`${API_BASE}/jobs?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<JobsApiResponse>;
}
