import { TaskStatus } from '../task-status';
import { IsOptional, IsEnum, IsString } from 'class-validator';
export class CreateFilterTaskDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
