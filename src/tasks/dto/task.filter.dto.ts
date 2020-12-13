import { IsIn, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Task } from '../task.model';

export class FilterTaskDTO {
  @IsOptional()
  @IsNotEmpty()
  @IsIn(['open', 'in_progress', 'done'])
  status?: Task['status'];

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  query?: string;
}
