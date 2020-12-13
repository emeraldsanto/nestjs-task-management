import { Task } from '../task.model';

export class FilterTaskDTO {
  status?: Task['status'];
  query?: string;
}
