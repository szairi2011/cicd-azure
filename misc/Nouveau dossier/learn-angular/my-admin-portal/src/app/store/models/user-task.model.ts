export interface UserTask {
  id?: string | number;
  title: string;
  description?: string;
  group?: string;
  time?: string;
  isComplete: boolean;
}
