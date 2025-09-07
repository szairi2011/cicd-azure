export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  assignee?: {
    id: number;
    name: string;
    avatar?: string;
  };
  category?: string;
}
