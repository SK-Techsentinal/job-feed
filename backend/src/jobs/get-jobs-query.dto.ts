import { IsOptional, IsInt, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// This DTO (Data Transfer Object) defines what query parameters
// GET /jobs is allowed to receive, and validates them automatically.
//
// NestJS's ValidationPipe reads these decorators and:
//   - Rejects page=-1 with 400
//   - Rejects page=abc with 400
//   - Sets defaults if page/limit are missing
//   - Strips any extra unknown fields

export class GetJobsQueryDto {
  @IsOptional()
  @Type(() => Number)   // Transform URL string "2" → number 2
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
