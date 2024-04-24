import { createSlice } from "@reduxjs/toolkit";
import { tagType, timerType } from "../../types/types";

interface ITimersState {
  isFailed: boolean;
  error: string;
  selectDate: number;
  timers: timerType[] | [];
  selectedTimers: timerType[] | null;
  selectedTags: tagType[] | null;
  currentEditTimer: number;
  currentTimerIsShowTags: number;
  currentTimerIsShowProjects: number;
}

const initialState: ITimersState = {
  selectDate: new Date().getTime(),
  selectedTimers: null,
  selectedTags: null,
  currentEditTimer: 0,
  isFailed: false,
  error: "",
  currentTimerIsShowProjects: 0,
  currentTimerIsShowTags: 0,
  timers: [],
};

export const timersSlice = createSlice({
  name: "timers",
  initialState,
  reducers: {
    setSelectedTimers(state, action) {
      state.selectedTimers = action.payload;
    },
    setTimers(state, action) {
      state.isFailed = false;
      state.error = "";
      state.timers = action.payload;
      state.currentEditTimer = 0;
    },
    setCurrentEditTimer(state, action) {
      state.currentEditTimer = action.payload;
    },
    setCurrentTimerIsShowTags(state, action) {
      state.currentTimerIsShowTags = action.payload;
    },
    setCurrentTimerIsShowProjects(state, action) {
      state.currentTimerIsShowProjects = action.payload;
    },
    setSelectDate(state, action) {
      state.selectDate = action.payload;
    },
    setSelectedTags(state, action) {
      state.isFailed = false;
      state.error = "";
      state.selectedTags = action.payload;
      state.currentEditTimer = 0;
    },
  },
});

export default timersSlice.reducer;
