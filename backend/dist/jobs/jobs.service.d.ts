import { JobsResponse } from './job.interface';
import { GetJobsQueryDto } from './get-jobs-query.dto';
export declare class JobsService {
    findAll(query: GetJobsQueryDto): JobsResponse;
}
