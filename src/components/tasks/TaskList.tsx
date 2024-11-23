import { Add, Record } from "iconsax-react";
import { TaskItem } from "./TaskItem.tsx";
import { Task, TaskStatus } from "@/api/models/tasks.model.ts";
import { Button } from "@/components/ui/button.tsx";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import {
  addNewTask,
  filterTasks,
  updateTask,
} from "@/store/tasks/tasksSlice.ts";
import { v4 as uuid } from "uuid";
import { useMemo } from "react";
import { useTasksHandler } from "@/lib/hooks/useSaveTasks.ts";

type TaskListProps = {
  variant: "Todo" | "In Progress" | "Completed";
  taskList: Task[];
};

const TaskList = ({ variant, taskList }: TaskListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { saveTasks } = useTasksHandler();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "TASK_ITEM",
      canDrop: (item: Task) => {
        return item.status !== variant;
      },
      drop: (item: Task) => {
        const updatedTask = { ...item, status: variantToStatus[variant] };
        saveTasks(updatedTask);
        dispatch(updateTask({ task: updatedTask }));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [variant, taskList],
  );

  const variantToStatus: Record<string, TaskStatus> = {
    Todo: TaskStatus.TODO,
    Completed: TaskStatus.COMPLETED,
    "In Progress": TaskStatus.IN_PROGRESS,
  };

  const variantClasses: Record<string, string> = {
    Todo: "text-warning-500",
    Completed: "text-success-500",
    "In Progress": "text-info-500",
  };

  const variantTitles: Record<string, string> = {
    Todo: "Todo",
    Completed: "Completed",
    "In Progress": "In Progress",
  };

  const addTempTask = () => {
    const newTask: Task = {
      assigneeId: null,
      id: uuid(),
      description: null,
      dueDate: null,
      name: null,
      priority: null,
      status: variantToStatus[variant],
      isValid: false,
    };
    dispatch(addNewTask(newTask));
    dispatch(filterTasks());
  };

  const filteredTasks = useMemo(() => {
    return taskList.filter((task) => {
      return task.status === variantToStatus[variant];
    });
  }, [taskList]);

  return (
    <div className={isOver ? "bg-dark-50" : ""}>
      <div className="border border-dashed border-dark-100 p-3 rounded-lg h-full">
        <div className="flex items-center justify-between w-full bg-white p-4 rounded-lg">
          <div className="flex items-center gap-2">
            <span>
              <Record size="16" className={variantClasses[variant]} />
            </span>
            <p className="font-semibold">{variantTitles[variant]}</p>
            <span className="ml-1 bg-primary-50 text-primary-500 w-4 text-center text-xs rounded-full">
              {filteredTasks.length}
            </span>
          </div>
          <button>+</button>
        </div>
        <div className="my-4 h-[90%]" ref={drop}>
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} saveAllTasks={saveTasks} />
          ))}
          <div className="flex items-center justify-center font-semibold text-xs text-dark-300">
            <Button variant="ghost" onClick={addTempTask}>
              <Add size="16" /> Add task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TaskList };
