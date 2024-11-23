import { configureStore } from "@reduxjs/toolkit";
import TasksReducer, { tasksMiddleware } from "./tasks/tasksSlice.ts";
import AssigneesReducer from "./assignees/assigneesSlice.ts";

export const store = configureStore({
  reducer: {
    tasks: TasksReducer,
    assignees: AssigneesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
