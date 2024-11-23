import { TaskDetailView, TaskList } from "@/components/tasks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import {
  getAllAssignees,
  loadAssignees,
} from "../store/assignees/assigneesSlice.ts";
import { fetchAllTasks } from "@/store/tasks/tasksSlice.ts";

const TasksPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const allTasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch(loadAssignees());
    dispatch(getAllAssignees());
    dispatch(fetchAllTasks());
  }, []);

  return (
    <section className="h-full">
      <div className="grid grid-cols-3 px-5 py-6 gap-5 h-full">
        <TaskList variant="Todo" taskList={allTasks} />
        <TaskList variant="In Progress" taskList={allTasks} />
        <TaskList variant="Completed" taskList={allTasks} />
      </div>
      <TaskDetailView />
    </section>
  );
};

export { TasksPage };
