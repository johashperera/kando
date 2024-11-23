import { Task } from "@/api/models/tasks.model.ts";
import { postTasks, removeTask } from "@/store/tasks/tasksSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

const useTasksHandler = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);
  const saveTasks = (updatedTask: Task) => {
    console.log("updating task", updatedTask);
    const updatedTasks = allTasks
      .map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      })
      .filter((task) => {
        return task.isValid;
      });

    dispatch(postTasks(updatedTasks));
  };
  const deleteTask = (id: string) => {
    const updatedTasks = allTasks.filter((task) => task.id !== id);
    dispatch(removeTask({ id }));
    dispatch(postTasks(updatedTasks));
  };
  return { saveTasks, deleteTask };
};

export { useTasksHandler };
