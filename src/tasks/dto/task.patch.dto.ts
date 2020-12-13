import { IsIn, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { Task } from '../task.model';

export class PatchTaskDTO {
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  title?: Task['title'];

  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  description?: Task['description'];

  @IsOptional()
  @IsIn(['open', 'in_progress', 'done'])
  status?: Task['status'];
}
