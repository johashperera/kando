import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { ConfirmationDialog, DatePicker } from "../common";
import {
  ArrowRight,
  Calendar,
  CloseCircle,
  DocumentText,
  Flag,
  Record,
  Trash,
  User,
} from "iconsax-react";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { setShowDetailsView, updateTask } from "@/store/tasks/tasksSlice.ts";
import { Textarea } from "@/components/ui/textarea.tsx";
import { AssigneeSelector } from "@/components/tasks/AssigneeSelector.tsx";
import { PrioritySelector } from "@/components/tasks/PrioritySelector.tsx";
import { Task, TaskPriority } from "@/api/models/tasks.model.ts";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTasksHandler } from "@/lib/hooks/useSaveTasks.ts";
import { Button } from "@/components/ui/button.tsx";

type TaskUpdateForm = {
  name: string | null;
  dueDate: string | null;
  assigneeId: string | null;
  priority: string | null;
  status: string | null;
  description: string | null;
};

const taskUpdateSchema = yup.object({
  name: yup.string().required(),
  dueDate: yup.string().required(),
  assigneeId: yup.string().required(),
  priority: yup.string().required(),
  status: yup.string().required(),
  description: yup.string(),
});

const TaskDetailView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { saveTasks, deleteTask } = useTasksHandler();

  const selectedTask = useSelector(
    (state: RootState) => state.tasks.selectedTask,
  );
  const showDetailsView = useSelector(
    (state: RootState) => state.tasks.showDetailsView,
  );
  const assignees = useSelector(
    (state: RootState) => state.assignees.assignees,
  );

  const handleSubmit = (values: TaskUpdateForm) => {
    console.log(values);
    const updatedTask = {
      ...selectedTask,
      ...values,
      priority: values.priority as TaskPriority | null,
      isValid: true,
    } as Task;
    saveTasks(updatedTask);
    dispatch(
      updateTask({
        task: updatedTask,
      }),
    );
  };

  const taskUpdateForm = useFormik<TaskUpdateForm>({
    initialValues: {
      name: selectedTask ? selectedTask.name : "",
      priority: selectedTask ? (selectedTask.priority as string) : null,
      dueDate: selectedTask ? selectedTask.dueDate : "",
      assigneeId: selectedTask ? selectedTask.assigneeId : "",
      status: selectedTask ? selectedTask.status : "",
      description: selectedTask ? selectedTask.description : "",
    },
    validationSchema: taskUpdateSchema,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const closeDetailView = () => {
    dispatch(setShowDetailsView({ showDetailsView: false }));
  };

  const onValueChange = async (
    name: keyof typeof taskUpdateForm.values,
    value: string | null,
  ) => {
    dispatch(
      updateTask({
        task: {
          ...selectedTask,
          [name]: value,
          isValid: false,
        } as Task,
      }),
    );
    await taskUpdateForm.setFieldValue(name, value);
    await taskUpdateForm.submitForm();
  };

  const onDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
    }
  };

  const status: Record<string, ReactNode> = {
    todo: (
      <>
        <p className="flex items-center gap-2">
          <span>
            <Record size="16" className="text-warning-500" />
          </span>
          Todo
        </p>
      </>
    ),
    inProgress: (
      <>
        <p className="flex items-center gap-2">
          <span>
            <Record size="16" className="text-info-500" />
          </span>
          In Progress
        </p>
      </>
    ),
    completed: (
      <>
        <p className="flex items-center gap-2">
          <span>
            <Record size="16" className="text-success-500" />
          </span>
          Completed
        </p>
      </>
    ),
  };

  return (
    <>
      <Drawer
        open={showDetailsView}
        direction="right"
        size={480}
        onClose={closeDetailView}
      >
        <div className="flex items-center justify-between py-4 px-6 border-b border-b-dark-50">
          <Button>Mark Complete</Button>
          <div className="flex items-center gap-4">
            <ConfirmationDialog
              title="Are you sure you want to delete selected task?"
              body="This will permanently delete the selected task. These items wil no longer be accessible to you. This action is irreversible."
              rejectionActionText="Cancel"
              confirmationActionText="Yes, delete"
              confirm={onDeleteTask}
            >
              <button>
                <Trash size="20" />
              </button>
            </ConfirmationDialog>
            <button onClick={closeDetailView}>
              <ArrowRight size="20" />
            </button>
          </div>
        </div>
        <div className="px-6 py-4">
          <textarea
            value={taskUpdateForm.values.name as string}
            className="w-full font-semibold text-2xl resize-none border border-dark-50 p-3 rounded-lg"
          ></textarea>
          <div className="grid grid-cols-2 mt-4 gap-5">
            <div>
              <p className="flex items-center gap-2 text-dark-300">
                <span>
                  <Record size="16" />
                </span>
                Status
              </p>
            </div>
            <div>{status["todo"]}</div>
            <div>
              <p className="flex items-center gap-2 text-dark-300">
                <span>
                  <Calendar size="16" />
                </span>
                Due Date
              </p>
            </div>
            <div className="flex items-center gap-4">
              <DatePicker
                selectedDate={taskUpdateForm.values.dueDate}
                onDateChange={(date) => onValueChange("dueDate", date)}
              >
                <div className="flex items-center gap-2">
                  <button className="text-dark-300 text-[13px] border border-dashed border-dark-100 p-1 rounded-full">
                    <Calendar size="18" />
                  </button>
                  <p>No due date</p>
                </div>
              </DatePicker>
              <button>
                <CloseCircle size="16" />
              </button>
            </div>
            <div>
              <p className="flex items-center gap-2 text-dark-300">
                <span>
                  <User size="16" />
                </span>
                Assignee
              </p>
            </div>
            <div className="flex items-center gap-4">
              <AssigneeSelector
                assignees={assignees}
                selectedAssigneeId={taskUpdateForm.values.assigneeId}
                onAssigneeChange={(assigneeId) =>
                  onValueChange("assigneeId", assigneeId)
                }
              >
                <div className="flex items-center gap-2">
                  <button className="text-dark-300 text-[13px] border border-dashed border-dark-100 p-1 rounded-full">
                    <User size="18" />
                  </button>
                  <p>No assignee</p>
                </div>
              </AssigneeSelector>
              <button>
                <CloseCircle size="16" />
              </button>
            </div>
            <div>
              <p className="flex items-center gap-2 text-dark-300">
                <span>
                  <Flag size="16" />
                </span>
                Priority
              </p>
            </div>
            <div className="flex items-center gap-2">
              <PrioritySelector
                priority={taskUpdateForm.values.priority as TaskPriority}
                onPriorityChange={(priority) =>
                  onValueChange("priority", priority)
                }
              >
                <button>Set priority</button>
              </PrioritySelector>
              <button>
                <CloseCircle size="16" />
              </button>
            </div>
          </div>
          <div className="text-dark-300 mt-8">
            <p className="flex items-center gap-2 mb-2">
              <span>
                <DocumentText size="16" />
              </span>{" "}
              Description
            </p>
            <Textarea
              value={taskUpdateForm.values.description as string}
              onChange={(event) =>
                onValueChange("description", event.target.value as string)
              }
            />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export { TaskDetailView };
