"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const MOCK_JOBS = [
    { id: '1', title: 'Senior Frontend Engineer', company: 'Stripe', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-25' },
    { id: '2', title: 'Product Designer', company: 'Figma', category: 'Design', type: 'Full-time', location: 'Remote', postedAt: '2026-03-24' },
    { id: '3', title: 'Backend Engineer (Node.js)', company: 'Vercel', category: 'Engineering', type: 'Contract', location: 'Remote', postedAt: '2026-03-23' },
    { id: '4', title: 'UX Researcher', company: 'Notion', category: 'Design', type: 'Contract', location: 'Remote', postedAt: '2026-03-22' },
    { id: '5', title: 'DevOps Engineer', company: 'Cloudflare', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-21' },
    { id: '6', title: 'React Native Developer', company: 'Linear', category: 'Engineering', type: 'Contract', location: 'Remote', postedAt: '2026-03-20' },
    { id: '7', title: 'Motion Designer', company: 'Loom', category: 'Design', type: 'Part-time', location: 'Remote', postedAt: '2026-03-19' },
    { id: '8', title: 'Full Stack Engineer', company: 'Railway', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-18' },
    { id: '9', title: 'Brand Designer', company: 'Vercel', category: 'Design', type: 'Full-time', location: 'Remote', postedAt: '2026-03-17' },
    { id: '10', title: 'Platform Engineer', company: 'Supabase', category: 'Engineering', type: 'Contract', location: 'Remote', postedAt: '2026-03-16' },
    { id: '11', title: 'iOS Engineer', company: 'Mercury', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-15' },
    { id: '12', title: 'Product Designer (Growth)', company: 'Linear', category: 'Design', type: 'Full-time', location: 'Remote', postedAt: '2026-03-14' },
    { id: '13', title: 'Data Engineer', company: 'Airbyte', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-13' },
    { id: '14', title: 'Freelance Illustrator', company: 'Dribbble', category: 'Design', type: 'Contract', location: 'Remote', postedAt: '2026-03-12' },
    { id: '15', title: 'Staff Engineer', company: 'PlanetScale', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-11' },
    { id: '16', title: 'UI Designer', company: 'Pitch', category: 'Design', type: 'Part-time', location: 'Remote', postedAt: '2026-03-10' },
    { id: '17', title: 'Security Engineer', company: 'Tailscale', category: 'Engineering', type: 'Full-time', location: 'Remote', postedAt: '2026-03-09' },
    { id: '18', title: 'Design Systems Lead', company: 'Radix', category: 'Design', type: 'Contract', location: 'Remote', postedAt: '2026-03-08' },
    { id: '19', title: 'TypeScript Engineer', company: 'tRPC', category: 'Engineering', type: 'Contract', location: 'Remote', postedAt: '2026-03-07' },
    { id: '20', title: 'Visual Designer', company: 'Framer', category: 'Design', type: 'Full-time', location: 'Remote', postedAt: '2026-03-06' },
];
let JobsService = class JobsService {
    findAll(query) {
        const { page, limit, category, type } = query;
        let filtered = [...MOCK_JOBS];
        if (category) {
            filtered = filtered.filter((job) => job.category.toLowerCase() === category.toLowerCase());
        }
        if (type) {
            filtered = filtered.filter((job) => job.type.toLowerCase() === type.toLowerCase());
        }
        const total = filtered.length;
        const totalPages = total === 0 ? 0 : Math.ceil(total / limit);
        const startIndex = (page - 1) * limit;
        const data = filtered.slice(startIndex, startIndex + limit);
        return {
            data,
            meta: { total, page, limit, totalPages },
        };
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)()
], JobsService);
//# sourceMappingURL=jobs.service.js.map