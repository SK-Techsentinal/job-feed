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
export interface JobsResponse {
    data: Job[];
    meta: PaginationMeta;
}
