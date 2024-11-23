import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Assignee } from "@/api/models/tasks.model.ts";
import { tasksAPI } from "@/api/tasksAPI.ts";
import { InitialData } from "@/lib/initial-data.ts";

export interface AssigneesState {
  value: number;
  assignees: Assignee[];
  error: string | null;
}

const initialState: AssigneesState = {
  value: 0,
  assignees: [],
  error: null,
};

export const loadAssignees = createAsyncThunk("assignees/loadAssignees", () => {
  return tasksAPI.loadInitialData(InitialData.getAssigneeData());
});

export const getAllAssignees = createAsyncThunk(
  "assignees/getAllAssignees",
  () => {
    return tasksAPI.getAllAssignees();
  },
);

export const assigneesSlice = createSlice({
  name: "assignees",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAssignees.fulfilled, (state, action) => {
      state.assignees = action.payload as Assignee[];
    });
  },
});

export const { increment, decrement, incrementByAmount } =
  assigneesSlice.actions;

export default assigneesSlice.reducer;
