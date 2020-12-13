import { IsNotEmpty, MaxLength } from 'class-validator';
import { Task } from '../task.model';

export class CreateTaskDTO {
  @IsNotEmpty()
  @MaxLength(255)
  readonly title: Task['title'] = '';

  @IsNotEmpty()
  @MaxLength(255)
  readonly description: Task['description'] = '';
}
