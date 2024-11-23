export interface Task {
  id: string;
  name: string | null;
  status: TaskStatus | null;
  priority: TaskPriority | null;
  dueDate: string | null;
  description: string | null;
  assigneeId: string | null;
  isValid: boolean;
}

export interface Assignee {
  id: string;
  name: string;
  profileImage: string;
}

export enum TaskStatus {
  TODO = "Todo",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}
