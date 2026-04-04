import { JobsService } from './jobs.service';
import { GetJobsQueryDto } from './get-jobs-query.dto';
import { JobsResponse } from './job.interface';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    getJobs(query: GetJobsQueryDto): JobsResponse;
}
