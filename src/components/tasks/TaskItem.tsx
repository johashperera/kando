import { Calendar, Clock, TickCircle, User } from "iconsax-react";
import { DatePicker } from "../common";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { AssigneeSelector } from "@/components/tasks/AssigneeSelector.tsx";
import { PrioritySelector } from "@/components/tasks/PrioritySelector.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useDrag } from "react-dnd";
import { Task, TaskPriority } from "@/api/models/tasks.model.ts";
import {
  setSelectedTask,
  setShowDetailsView,
  updateTask,
} from "@/store/tasks/tasksSlice.ts";
import { useFormik } from "formik";
import * as yup from "yup";
import { differenceInDays } from "date-fns";
import { motion } from "motion/react";

type TaskItemProps = {
  task: Task;
  saveAllTasks: (updatedTask: Task) => void;
};

type TaskForm = {
  name: string | null;
  dueDate: string | null;
  assigneeId: string | null;
  priority: string | null;
};

const taskSchema = yup.object({
  name: yup.string().required(),
  dueDate: yup.string().required(),
  assigneeId: yup.string().required(),
  priority: yup.string().required(),
});

const TaskItem = ({ task, saveAllTasks }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (values: TaskForm) => {
    const updatedTask = {
      ...task,
      ...values,
      priority: values.priority as TaskPriority | null,
      isValid: true,
    };
    saveAllTasks(updatedTask);
    dispatch(
      updateTask({
        task: updatedTask,
      }),
    );
  };

  const taskForm = useFormik<TaskForm>({
    initialValues: {
      name: task.name,
      priority: task.priority as string | null,
      dueDate: task.dueDate,
      assigneeId: task.assigneeId,
    },
    validationSchema: taskSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "TASK_ITEM",
      item: task,

      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task],
  );

  const assignees = useSelector(
    (state: RootState) => state.assignees.assignees,
  );

  const selectTask = () => {
    dispatch(setSelectedTask({ selectedTask: task }));
    if (task.isValid) {
      dispatch(setShowDetailsView({ showDetailsView: true }));
    }
  };

  const onValueChange = async (
    name: keyof typeof taskForm.values,
    value: string | null,
  ) => {
    dispatch(
      updateTask({
        task: {
          ...task,
          [name]: value,
          isValid: false,
        },
      }),
    );
    await taskForm.setFieldValue(name, value);
    await taskForm.submitForm();
  };

  const getDueDateMessage = (dueDate: string | null): string => {
    if (!dueDate) return "No due date set";

    const today = new Date();
    const taskDueDate = new Date(dueDate);
    const daysDiff = differenceInDays(taskDueDate, today);

    if (daysDiff > 1) {
      return `Should complete within ${daysDiff} days`;
    } else if (daysDiff === 1) {
      return `Should complete within today`;
    } else if (daysDiff === 0) {
      return `Should complete within today`;
    } else if (daysDiff === -1) {
      return `Should’ve completed yesterday`;
    } else {
      return `Should’ve completed ${Math.abs(daysDiff)} days ago`;
    }
  };

  return (
    <div ref={drag}>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className={`bg-white rounded-lg my-4 ${isDragging ? " opacity-50 cursor-grab" : ""}`}
        onClick={selectTask}
      >
        <div className="flex items-center gap-2 p-3">
          <TickCircle size="20" className="text-dark-300" />
          <Input
            value={taskForm.values.name ?? ""}
            onChange={(e) => onValueChange("name", e.target.value)}
          />
        </div>
        <hr className="border-dark-50" />
        {task.description ? (
          <div className="p-3">
            <p className="text-[16px] text-dark-400">{task.description}</p>
          </div>
        ) : null}
        <div className="p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <AssigneeSelector
                assignees={assignees}
                selectedAssigneeId={taskForm.values.assigneeId}
                onAssigneeChange={(assigneeId) =>
                  onValueChange("assigneeId", assigneeId)
                }
              >
                <button className="text-dark-300 text-[13px] border border-dashed border-dark-100 p-1 rounded-full">
                  <User size="18" />
                </button>
              </AssigneeSelector>
            </div>
            <div>
              <DatePicker
                selectedDate={taskForm.values.dueDate}
                onDateChange={(date) => onValueChange("dueDate", date)}
              >
                <button className="text-dark-300 text-[13px] border border-dashed border-dark-100 p-1 rounded-full">
                  <Calendar size="18" />
                </button>
              </DatePicker>
            </div>
          </div>
          <div>
            <PrioritySelector
              priority={taskForm.values.priority as TaskPriority}
              onPriorityChange={(priority) =>
                onValueChange("priority", priority)
              }
            >
              <button className="text-dark-300 text-[13px] border border-dashed border-dark-100 p-1 rounded">
                Set priority
              </button>
            </PrioritySelector>
          </div>
        </div>
        <div>
          <hr className="border-dark-50" />
          <p className="p-3 text-[13px] font-medium flex items-center gap-2">
            <span>
              <Clock size="16" />
            </span>{" "}
            {getDueDateMessage(taskForm.values.dueDate)}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export { TaskItem };
