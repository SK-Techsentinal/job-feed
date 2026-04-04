import { Controller, Get, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { GetJobsQueryDto } from './get-jobs-query.dto';
import { JobsResponse } from './job.interface';

// The controller's only job:
//   1. Accept the HTTP request
//   2. Hand off to the service
//   3. Return the result
//
// Zero business logic lives here — that's all in JobsService.

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  getJobs(@Query() query: GetJobsQueryDto): JobsResponse {
    return this.jobsService.findAll(query);
  }
}
