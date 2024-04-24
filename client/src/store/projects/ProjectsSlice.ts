import { createSlice } from "@reduxjs/toolkit";
import { projectType } from "../../types/types";

interface IProjectsState {
  order: "desc" | "asc";
  isFailed: boolean;
  error: string;
  projects: projectType[] | [];
  selectedProjects: projectType[] | null;
  currentEditProject: number | null;
  currentProjectIsShowTags: number;
  currentProjectIsShowSubProjects: number;
  sortBy: "projectName" | "status" | "";
}

const initialState: IProjectsState = {
  sortBy: "projectName",
  currentEditProject: null,
  order: "asc",
  isFailed: false,
  error: "",
  currentProjectIsShowTags: 0,
  currentProjectIsShowSubProjects: 0,
  projects: [],
  selectedProjects: null,
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.isFailed = false;
      state.error = "";
      state.projects = action.payload;
      state.currentEditProject = null;
    },
    setSelectedProjects(state, action) {
      state.isFailed = false;
      state.error = "";
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
