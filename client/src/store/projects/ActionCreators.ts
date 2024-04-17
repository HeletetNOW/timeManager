import { resourceUsage } from "process";
import { projectsAPI } from "../../app/api/projectsAPI";
import { projectType, subProjectType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { projectsSlice } from "./ProjectsSlice";

export const getProjects =
  (id?: number) => async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      const { order, sortBy } = getSate().projectsReducer;

      const result = await projectsAPI.getProjects(
        undefined,
        order,
        id,
        sortBy
      );

      dispatch(projectsSlice.actions.setProjects(result.data));
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
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
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const createSubProject =
  (subProjectName: string, projectId: number, description?: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      const result = await projectsAPI.createSubProject(
        subProjectName,
        projectId,
        description
      );

      dispatch(projectsSlice.actions.projectsFetchingSuccess());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const setSubProjectStatus =
  (subProjectStatus: boolean, subProjectId: number) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      const result = await projectsAPI.setSubProjectStatus(
        subProjectStatus,
        subProjectId
      );

      dispatch(projectsSlice.actions.projectsFetchingSuccess());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const deleteSubProject =
  (subProjectId: number) => async (dispatch: AppDispatch) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      const result = await projectsAPI.removeSubProject(subProjectId);

      dispatch(projectsSlice.actions.projectsFetchingSuccess());
      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const createProject =
  (projectName: string, tags: number[]) => async (dispatch: AppDispatch) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      const result = await projectsAPI.createProject(projectName, tags);

      dispatch(projectsSlice.actions.projectsFetchingSuccess());
      dispatch(getProjects());

      return result.status;
    } catch (error: any) {
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const getProjectByTagIdSelected =
  (tagId: number, projectName: string | undefined) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());
      let allProjects = (await projectsAPI.getProjects(undefined, projectName))
        .data;
      let selectionProjects = (await projectsAPI.getProjects([tagId], "asc"))
        .data;

      let result: (projectType & { isChecked: boolean })[] = [];

      selectionProjects.sort((a: projectType, b: projectType) =>
        a.id > b.id ? -1 : 1
      );

      allProjects.forEach((item: projectType) => {
        const itemWithChecked: Partial<projectType> & { isChecked: boolean } = {
          ...item,
          isChecked: false,
        };

        if (
          selectionProjects.length > 0 &&
          item.id === selectionProjects[selectionProjects.length - 1].id
        ) {
          itemWithChecked.isChecked = true;
          selectionProjects.pop();
        }
        result.push(itemWithChecked as projectType & { isChecked: boolean });
      });

      dispatch(projectsSlice.actions.projectsFetchingSuccess());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const setTagToProject =
  (id: number, tagId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      let status;

      if (action === "add") {
        status = (await projectsAPI.addTagToProject(tagId, id)).status;
      } else if (action === "delete") {
        status = (await projectsAPI.removeTagToProject(tagId, id)).status;
      }

      dispatch(projectsSlice.actions.projectsFetchingSuccess());
      return status;
    } catch (error: any) {
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const setProjectName =
  (projectName: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      dispatch(projectsSlice.actions.projectsFetching());

      const { currentEditProject } = getSate().projectsReducer;

      if (projectName === "") {
        return dispatch(projectsSlice.actions.setCurrentEditProjects(null));
      }

      if (currentEditProject) {
        const result = await projectsAPI.setProjectName(
          projectName,
          currentEditProject
        );
        dispatch(getProjects());

        dispatch(projectsSlice.actions.projectsFetchingSuccess());
        return result.status;
      } else {
        projectsSlice.actions.projectsFetchingError(
          "Невозможно изменить имя проекта"
        );
      }
    } catch (error: any) {
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };

export const deleteProject = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(projectsSlice.actions.projectsFetching());

    const result = await projectsAPI.deleteProject(id);

    dispatch(getProjects());
    dispatch(projectsSlice.actions.projectsFetchingSuccess());
    return result.status;
  } catch (error: any) {
    dispatch(
      projectsSlice.actions.projectsFetchingError(error.response?.data?.message)
    );
    return error.response.status;
  }
};

export const selectProject =
  (projectName?: string, selectTags?: number[]) =>
  (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { projects, order, sortBy, currentSearchProject } =
        getSate().projectsReducer;

      const searchProject = projectName ? projectName : currentSearchProject;

      let selectDate = projects.filter((project) =>
        project.projectName
          .toLocaleLowerCase()
          .includes(searchProject.toLocaleLowerCase())
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

      if (selectTags) {
        selectDate = selectDate.filter((project) => {
          return project.tags.some((tag) => selectTags.includes(tag.id));
        });
      }

      if (order === "asc") {
        selectDate = selectDate.reverse();
      }

      dispatch(projectsSlice.actions.setSelectedProjects(selectDate));
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
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
      dispatch(
        projectsSlice.actions.projectsFetchingError(
          error.response?.data?.message
        )
      );
      return error.response.status;
    }
  };
