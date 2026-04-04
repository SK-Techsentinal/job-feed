import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchJobs } from '../api/jobs';
import { Job, PaginationMeta, JobFilters } from '../types/jobs';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { JobsList } from '../components/JobsList';
import { Pagination } from '../components/Pagination';

// ─── Default values ───────────────────────────────────────────────────────────
const DEFAULT_META: PaginationMeta = { total: 0, page: 1, limit: 10, totalPages: 0 };

// ─── JobsPage ─────────────────────────────────────────────────────────────────
// This is the "brain" of the page. It:
//   1. Reads initial state from the URL (?category=...&type=...&page=...)
//   2. Fetches jobs from the backend whenever filters or page change
//   3. Updates the URL whenever filters or page change
//   4. Passes data down to child components as props
//
// The URL is the SINGLE SOURCE OF TRUTH — there is no separate filter state.

export function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read current filters + page directly from the URL
  const filters: JobFilters = {
    category: searchParams.get('category') ?? '',
    type: searchParams.get('type') ?? '',
  };
  const page = Number(searchParams.get('page') ?? '1');

  // Local state only for the fetched data itself
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>(DEFAULT_META);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch whenever URL params change ────────────────────────────────────────
  useEffect(() => {
    let cancelled = false; // prevents stale responses from overwriting fresh ones

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchJobs(filters, page);
        if (!cancelled) {
          setJobs(result.data);
          setMeta(result.meta);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => { cancelled = true; }; // cleanup if component re-renders before fetch finishes
  }, [searchParams]); // re-run every time the URL changes

  // ── Handlers ─────────────────────────────────────────────────────────────────

  // When filters change: update URL and reset to page 1
  function handleFiltersChange(newFilters: JobFilters) {
    const params: Record<string, string> = { page: '1' };
    if (newFilters.category) params.category = newFilters.category;
    if (newFilters.type) params.type = newFilters.type;
    setSearchParams(params);
  }

  // When page changes: update URL, keep existing filters
  function handlePageChange(newPage: number) {
    const params: Record<string, string> = { page: String(newPage) };
    if (filters.category) params.category = filters.category;
    if (filters.type) params.type = filters.type;
    setSearchParams(params);
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="page-layout">
      <header className="page-header">
        <h1 className="page-title">Browse Remote Jobs</h1>
        {!isLoading && !error && (
          <p className="page-subtitle">{meta.total} jobs found</p>
        )}
      </header>

      <div className="page-body">
        <FiltersSidebar filters={filters} onChange={handleFiltersChange} />

        <main className="page-main">
          <JobsList jobs={jobs} isLoading={isLoading} error={error} />
          <Pagination
            page={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </div>
  );
}
