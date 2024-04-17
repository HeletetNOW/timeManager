import { createSlice } from "@reduxjs/toolkit";
import { tagType, timerType } from "../../types/types";

interface ITimersState {
  isFetching: boolean;
  isFailed: boolean;
  error: string;
  selectDate: number;
  timers: timerType[] | [];
  selectedTags: tagType[] | [];
  currentEditTimer: number;
  currentTimerIsShowTags: number;
  currentTimerIsShowProjects: number;
}

const initialState: ITimersState = {
  selectDate: new Date().getTime(),
  selectedTags: [],
  currentEditTimer: 0,
  isFetching: false,
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
    timersFetching(state) {
      state.isFetching = true;
    },
    timersFetchingSuccess(state) {
      state.currentEditTimer = 0;
      state.isFetching = false;
      state.isFailed = false;
      state.error = "";
    },
    timersFetchingError(state, action) {
      state.isFetching = false;
      state.isFailed = true;
      state.error = action.payload;
    },
    setTimers(state, action) {
      state.isFailed = false;
      state.error = "";
      state.isFetching = false;
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
      state.isFetching = false;
      state.selectedTags = action.payload;
      state.currentEditTimer = 0;
    },
  },
});

export default timersSlice.reducer;
