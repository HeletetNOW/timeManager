import { projectsAPI } from "../../app/api/projectsAPI";
import { projectType, subProjectType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { projectsSlice } from "./ProjectsSlice";

export const getProjects =
  (id?: number) => async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { order, sortBy } = getSate().projectsReducer;

      const result = await projectsAPI.getProjects(
        undefined,
        order,
        id,
        sortBy
      );

      dispatch(projectsSlice.actions.setSelectedProjects(null));

      dispatch(projectsSlice.actions.setProjects(result.data));
      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const selectProjectById =
  (projectId: number) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { projects } = getSate().projectsReducer;

      return projects.find((project) => project.id === projectId);
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const createSubProject =
  (subProjectName: string, projectId: number, description?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const result = await projectsAPI.createSubProject(
        subProjectName,
        projectId,
        description
      );

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setSubProjectStatus =
  (subProjectStatus: boolean, subProjectId: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const result = await projectsAPI.setSubProjectStatus(
        subProjectStatus,
        subProjectId
      );

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const deleteSubProject =
  (subProjectId: number) => async (dispatch: AppDispatch) => {
    try {
      const result = await projectsAPI.removeSubProject(subProjectId);

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const createProject =
  (projectName: string, tags: number[]) => async (dispatch: AppDispatch) => {
    try {
      const result = await projectsAPI.createProject(projectName, tags);

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setTagToProject =
  (id: number, tagId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      let status;

      if (action === "add") {
        status = (await projectsAPI.addTagToProject(tagId, id)).status;
      } else if (action === "delete") {
        status = (await projectsAPI.removeTagToProject(tagId, id)).status;
      }

      return status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setProjectName =
  (projectName: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { currentEditProject } = getSate().projectsReducer;

      if (projectName === "") {
        return dispatch(projectsSlice.actions.setCurrentEditProjects(null));
      }

      if (currentEditProject) {
        const result = await projectsAPI.setProjectName(
          projectName,
          currentEditProject
        );

        return result.status;
      }
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const result = await projectsAPI.deleteProject(id);

    return result.status;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.status;
  }
};

export const setSortProjects =
  (sort: "projectName" | "status" | "") =>
  (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { sortBy, order } = getSate().projectsReducer;

      if (sortBy === sort) {
        if (order === "asc") {
          dispatch(projectsSlice.actions.setOrderToDesc());
        } else if (order === "desc") {
          dispatch(projectsSlice.actions.setOrderToAsc());
        }
      } else {
        dispatch(projectsSlice.actions.setOrderToDesc());
      }

      dispatch(projectsSlice.actions.setSortBy(sort));
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const selectProject =
  (projectName: string, selectTags: number[], isSetOrder?: boolean) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { projects, order, sortBy } = getSate().projectsReducer;

      if (
        projectName === "" &&
        selectTags.length === 0 &&
        isSetOrder === false
      ) {
        return dispatch(projectsSlice.actions.setSelectedProjects(null));
      }

      let selectDate = projects.filter((project) =>
        project.projectName
          .toLocaleLowerCase()
          .includes(projectName.toLocaleLowerCase())
      );

      if (sortBy === "projectName") {
        selectDate = selectDate.sort((a, b) =>
          a.projectName.localeCompare(b.projectName)
        );
      } else if (sortBy === "status") {
        selectDate = selectDate.sort(
          (a, b) => (a.status ? -1 : 1) - (b.status ? -1 : 1)
        );
      }

      if (selectTags.length > 0) {
        selectDate = selectDate.filter((project) => {
          return project.tags.some((tag) => selectTags.includes(tag.id));
        });
      }

      debugger;

      if (order === "desc") {
        selectDate = selectDate.reverse();
      }

      dispatch(projectsSlice.actions.setSelectedProjects(selectDate));
      return selectDate;
    } catch (error: any) {
      console.log(error.response.data.message);
      return [];
    }
  };

export const selectProjectsByTagId =
  (tagId: number, projectName: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { projects } = getSate().projectsReducer;

      let allProjects = projects.filter((project) =>
        project.projectName
          .toLocaleLowerCase()
          .includes(projectName.toLocaleLowerCase())
      );

      let selectedProjects = allProjects.filter((project) =>
        project.tags.some((tag) => tag.id === tagId)
      );

      let result: (projectType & { isChecked: boolean })[] = [];

      allProjects.map((project) => {
        let updatedItem: projectType & { isChecked: boolean } = {
          ...project,
          isChecked: selectedProjects.includes(project) ? true : false,
        };

        result.push(updatedItem);
      });

      result.sort((a, b) => a.id - b.id);

      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const selectSubProjects =
  (timerId: number, projectName: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { projects } = getSate().projectsReducer;

      let allProjects = projects.filter((project) =>
        project.projectName
          .toLocaleLowerCase()
          .includes(projectName.toLocaleLowerCase())
      );

      let selectedProjects = allProjects
        .map((project) => {
          return {
            ...project,
            subProjects: project.subProjects.filter((subProject) =>
              subProject.timers.some((timer) => timer.id === timerId)
            ),
          };
        })
        .filter((project) => project.subProjects.length > 0);

      let result: (projectType & {
        subProjects: (subProjectType & { isChecked: boolean })[];
      })[] = [];

      allProjects.map((project) => {
        let updatedItem: projectType & {
          subProjects: (subProjectType & { isChecked: boolean })[];
        } = {
          ...project,
          subProjects: project.subProjects
            .map((subProject) => {
              return {
                ...subProject,
                isChecked: selectedProjects.some((projectSelected) => {
                  return projectSelected.subProjects.some(
                    (subProjectSelected) =>
                      subProjectSelected.id === subProject.id
                  );
                }),
              };
            })
            .sort((a, b) => Number(a.isChecked) - Number(b.isChecked)),
        };

        result.push(updatedItem);
      });

      result.sort((a, b) => a.id - b.id);

      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };
