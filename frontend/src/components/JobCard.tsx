import { Job } from '../types/jobs';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <div className="job-card">
      <div className="job-card-top">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <p className="job-company">{job.company}</p>
        </div>
        <span className="job-type-badge">{job.type}</span>
      </div>
      <div className="job-card-bottom">
        <span className="job-category-tag">{job.category}</span>
        <span className="job-location">📍 {job.location}</span>
        <span className="job-date">Posted {job.postedAt}</span>
      </div>
    </div>
  );
}
