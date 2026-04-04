import { Job } from '../types/jobs';
import { JobCard } from './JobCard';

interface JobsListProps {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
}

export function JobsList({ jobs, isLoading, error }: JobsListProps) {
  // LOADING STATE — show grey skeleton cards so the layout doesn't jump
  if (isLoading) {
    return (
      <div className="jobs-list">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="job-card job-card-skeleton" aria-hidden="true" />
        ))}
      </div>
    );
  }

  // ERROR STATE — something went wrong with the fetch
  if (error) {
    return (
      <div className="state-box">
        <p className="state-icon">⚠️</p>
        <p className="state-title">Something went wrong</p>
        <p className="state-desc">{error}</p>
        <p className="state-desc">Make sure the backend is running on port 3000.</p>
      </div>
    );
  }

  // EMPTY STATE — fetch succeeded but no jobs matched the filters
  if (jobs.length === 0) {
    return (
      <div className="state-box">
        <p className="state-icon">🔍</p>
        <p className="state-title">No jobs found</p>
        <p className="state-desc">Try removing or changing your filters.</p>
      </div>
    );
  }

  // SUCCESS STATE — render the job cards
  return (
    <div className="jobs-list">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
