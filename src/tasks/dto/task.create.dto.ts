import { Task } from '../task.model';

export class CreateTaskDTO {
  readonly title: Task['title'] = '';
  readonly description: Task['description'] = '';
}
