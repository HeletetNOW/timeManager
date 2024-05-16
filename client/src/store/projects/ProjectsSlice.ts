import { createSlice } from "@reduxjs/toolkit";
import { projectType } from "../../types/types";

interface IProjectsState {
  order: "desc" | "asc";
  isFailed: boolean;
  isFetching: boolean;
  error: string;
  projects: projectType[] | [];
  selectedProjects: projectType[];
  currentEditProject: number;
  currentEditSubProject: number;
  currentProjectIsShowTags: number;
  currentProjectIsShowSubProjects: number;
  sortBy: "projectName" | "status" | "";
}

const initialState: IProjectsState = {
  sortBy: "projectName",
  currentEditProject: 0,
  order: "asc",
  isFetching: false,
  isFailed: false,
  error: "",
  currentProjectIsShowTags: 0,
  currentEditSubProject: 0,
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
      state.projects = action.payload;
      state.currentEditProject = 0;
    },
    setSelectedProjects(state, action) {
      state.isFailed = false;
      state.error = "";
      state.selectedProjects = action.payload;
      state.currentEditProject = 0;
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
    setCurrentEditSubProject(state, action) {
      state.currentEditSubProject = action.payload;
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
