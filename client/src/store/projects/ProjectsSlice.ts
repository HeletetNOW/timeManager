import { createSlice } from "@reduxjs/toolkit";
import { projectType } from "../../types/types";

interface IProjectsState {
  isFetching: boolean;
  order: "desc" | "asc";
  isFailed: boolean;
  error: string;
  projects: projectType[] | [];
  selectedProjects: projectType[] | [];
  currentEditProject: number | null;
  currentSearchProject: string;
  currentProjectIsShowTags: number;
  currentProjectIsShowSubProjects: number;
  sortBy: "projectName" | "status" | "";
}

const initialState: IProjectsState = {
  sortBy: "",
  currentSearchProject: "",
  currentEditProject: null,
  order: "asc",
  isFetching: false,
  isFailed: false,
  error: "",
  currentProjectIsShowTags: 0,
  currentProjectIsShowSubProjects: 0,
  projects: [],
  selectedProjects: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectsFetching(state) {
      state.isFetching = true;
    },
    projectsFetchingSuccess(state) {
      state.currentEditProject = null;
      state.isFetching = false;
      state.isFailed = false;
      state.error = "";
    },
    projectsFetchingError(state, action) {
      state.isFetching = false;
      state.isFailed = true;
      state.error = action.payload;
    },
    setProjects(state, action) {
      state.isFailed = false;
      state.error = "";
      state.isFetching = false;
      state.projects = action.payload;
      state.currentEditProject = null;
    },
    setSelectedProjects(state, action) {
      state.isFailed = false;
      state.error = "";
      state.isFetching = false;
      state.selectedProjects = action.payload;
      state.currentEditProject = null;
    },
    setOrderToDesc(state) {
      state.order = "desc";
    },
    setOrderToAsc(state) {
      state.order = "asc";
    },
    setCurrentEditProjects(state, action) {
      state.currentEditProject = action.payload;
    },
    setCurrentSearchProjects(state, action) {
      state.currentSearchProject = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setCurrentProjectIsShowTags(state, action) {
      state.currentProjectIsShowTags = action.payload;
    },
    setCurrentProjectIsShowSubProjects(state, action) {
      state.currentProjectIsShowSubProjects = action.payload;
    },
  },
});

export default projectsSlice.reducer;
