export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'done';
}
