import { Task } from '../task.model';

export class PatchTaskDTO {
  title?: Task['title'];
  description?: Task['description'];
  status?: Task['status'];
}
