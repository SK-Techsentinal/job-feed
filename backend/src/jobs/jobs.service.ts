import { Injectable } from '@nestjs/common';
import { Job, JobsResponse } from './job.interface';
import { GetJobsQueryDto } from './get-jobs-query.dto';

// ─── Mock Data ────────────────────────────────────────────────────────────────
// In a real app this would be a database query.
// The service method is structured so you can swap this for a DB call
// with minimal changes — just replace the array operations with ORM calls.

const MOCK_JOBS: Job[] = [
  { id: '1',  title: 'Senior Frontend Engineer',   company: 'Stripe',      category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-25' },
  { id: '2',  title: 'Product Designer',            company: 'Figma',       category: 'Design',      type: 'Full-time', location: 'Remote', postedAt: '2026-03-24' },
  { id: '3',  title: 'Backend Engineer (Node.js)',  company: 'Vercel',      category: 'Engineering', type: 'Contract',  location: 'Remote', postedAt: '2026-03-23' },
  { id: '4',  title: 'UX Researcher',               company: 'Notion',      category: 'Design',      type: 'Contract',  location: 'Remote', postedAt: '2026-03-22' },
  { id: '5',  title: 'DevOps Engineer',             company: 'Cloudflare',  category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-21' },
  { id: '6',  title: 'React Native Developer',      company: 'Linear',      category: 'Engineering', type: 'Contract',  location: 'Remote', postedAt: '2026-03-20' },
  { id: '7',  title: 'Motion Designer',             company: 'Loom',        category: 'Design',      type: 'Part-time', location: 'Remote', postedAt: '2026-03-19' },
  { id: '8',  title: 'Full Stack Engineer',         company: 'Railway',     category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-18' },
  { id: '9',  title: 'Brand Designer',              company: 'Vercel',      category: 'Design',      type: 'Full-time', location: 'Remote', postedAt: '2026-03-17' },
  { id: '10', title: 'Platform Engineer',           company: 'Supabase',    category: 'Engineering', type: 'Contract',  location: 'Remote', postedAt: '2026-03-16' },
  { id: '11', title: 'iOS Engineer',                company: 'Mercury',     category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-15' },
  { id: '12', title: 'Product Designer (Growth)',   company: 'Linear',      category: 'Design',      type: 'Full-time', location: 'Remote', postedAt: '2026-03-14' },
  { id: '13', title: 'Data Engineer',               company: 'Airbyte',     category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-13' },
  { id: '14', title: 'Freelance Illustrator',       company: 'Dribbble',    category: 'Design',      type: 'Contract',  location: 'Remote', postedAt: '2026-03-12' },
  { id: '15', title: 'Staff Engineer',              company: 'PlanetScale', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-11' },
  { id: '16', title: 'UI Designer',                 company: 'Pitch',       category: 'Design',      type: 'Part-time', location: 'Remote', postedAt: '2026-03-10' },
  { id: '17', title: 'Security Engineer',           company: 'Tailscale',   category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-09' },
  { id: '18', title: 'Design Systems Lead',         company: 'Radix',       category: 'Design',      type: 'Contract',  location: 'Remote', postedAt: '2026-03-08' },
  { id: '19', title: 'TypeScript Engineer',         company: 'tRPC',        category: 'Engineering', type: 'Contract',  location: 'Remote', postedAt: '2026-03-07' },
  { id: '20', title: 'Visual Designer',             company: 'Framer',      category: 'Design',      type: 'Full-time', location: 'Remote', postedAt: '2026-03-06' },
];

// ─── Service ──────────────────────────────────────────────────────────────────

@Injectable()
export class JobsService {
  findAll(query: GetJobsQueryDto): JobsResponse {
    const { page, limit, category, type } = query;

    // Step 1: Start with all jobs
    let filtered: Job[] = [...MOCK_JOBS];

    // Step 2: Apply category filter (case-insensitive)
    if (category) {
      filtered = filtered.filter(
        (job) => job.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Step 3: Apply type filter (case-insensitive)
    if (type) {
      filtered = filtered.filter(
        (job) => job.type.toLowerCase() === type.toLowerCase(),
      );
    }

    // Step 4: Paginate
    const total = filtered.length;
    const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const data = filtered.slice(startIndex, startIndex + limit);
    // If page is beyond range (e.g. page=999), data will just be []

    return {
      data,
      meta: { total, page, limit, totalPages },
    };
  }
}
