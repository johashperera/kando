import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, TaskStatus } from "@/api/models/tasks.model.ts";
import { tasksAPI } from "@/api/tasksAPI.ts";

interface AddNewTaskPayload {
  payload: Task;
}

interface UpdateTaskByIdPayload {
  payload: {
    task: Task;
  };
}

interface DeleteTaskByIdPayload {
  payload: {
    id: string;
  };
}

export interface TasksState {
  value: number;
  tasks: Task[];
  todoTasks: Task[];
  inProgressTasks: Task[];
  completedTasks: Task[];
  selectedTask: Task | null;
  showDetailsView: boolean;
  loaded: boolean;
}

const initialState: TasksState = {
  value: 0,
  tasks: [],
  todoTasks: [],
  inProgressTasks: [],
  completedTasks: [],
  selectedTask: null,
  showDetailsView: false,
  loaded: false,
};

export const postTasks = createAsyncThunk(
  "tasks/postTasks",
  (tasks: Task[]) => {
    return tasksAPI.setTasks(tasks);
  },
);

export const fetchAllTasks = createAsyncThunk("tasks/fetchAllTasks", () => {
  return tasksAPI.getAllTasks();
});

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    filterTasks: (state) => {
      state.todoTasks = state.tasks.filter(
        (task) => task.status === TaskStatus.TODO,
      );
      state.inProgressTasks = state.tasks.filter(
        (task) => task.status === TaskStatus.IN_PROGRESS,
      );
      state.completedTasks = state.tasks.filter(
        (task) => task.status === TaskStatus.COMPLETED,
      );
    },
    addNewTask: (state, { payload }: AddNewTaskPayload) => {
      state.tasks.push(payload);
    },
    updateTask: (state, { payload }: UpdateTaskByIdPayload) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.task.id) {
          return payload.task;
        }
        return task;
      });
    },
    removeTask: (state, { payload }: DeleteTaskByIdPayload) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
      state.showDetailsView = false;
      state.selectedTask = null;
    },
    setSelectedTask: (
      state,
      { payload }: { payload: { selectedTask: Task } },
    ) => {
      state.selectedTask = payload.selectedTask;
    },
    setShowDetailsView: (
      state,
      { payload }: { payload: { showDetailsView: boolean } },
    ) => {
      state.showDetailsView = payload.showDetailsView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postTasks.fulfilled, (_state, action) => {
      console.log(action.payload);
    });
    builder.addCase(fetchAllTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const tasksMiddleware = (store) => (next) => (action) => {
  if (action.type === fetchAllTasks.fulfilled.type) {
    store.dispatch(tasksSlice.actions.filterTasks());
  }
  return next(action);
};

export const {
  filterTasks,
  setSelectedTask,
  setShowDetailsView,
  addNewTask,
  updateTask,
  removeTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
