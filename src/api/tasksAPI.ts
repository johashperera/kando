import { Assignee, Task } from "./models/tasks.model.ts";

export const tasksAPI = {
  getAllTasks: (): Promise<Task[]> => {
    return new Promise((resolve, reject) => {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        try {
          const parsedTasks = JSON.parse(tasks);
          resolve(parsedTasks);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error("No tasks found."));
      }
    });
  },
  setTasks: (tasks: Task[]) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        resolve(tasks);
      } catch (e) {
        reject(e);
      }
    });
  },
  loadInitialData: (assigneeList: Assignee[]) => {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem("assignees", JSON.stringify(assigneeList));
        resolve(assigneeList);
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllAssignees: () => {
    return new Promise((resolve, reject) => {
      const assignees = localStorage.getItem("assignees");

      if (assignees) {
        try {
          const parsedAssignees = JSON.parse(assignees);
          resolve(parsedAssignees);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error("No assignees found."));
      }
    });
  },
};
