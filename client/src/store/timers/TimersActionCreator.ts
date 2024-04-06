import { projectsAPI } from "../../app/api/projectsAPI";
import { tagsAPI } from "../../app/api/tagsAPI";
import { timersAPI } from "../../app/api/timersAPI";
import { projectType, subProjectType, tagType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { timersSlice } from "./TimersSlice";

export const getTimers =
  (date?: number) =>
  async (dispatch: AppDispatch, getStore: () => RootState) => {
    try {
      const { selectDate } = getStore().timersReducer;

      dispatch(timersSlice.actions.timersFetching());

      const result = await timersAPI.getTimers(date ? date : selectDate);

      dispatch(timersSlice.actions.setTimers(result.data));
      dispatch(timersSlice.actions.timersFetchingSuccess());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const createTimer =
  (timerName: string, tags?: { id: number }[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      const result = await timersAPI.createTimer(timerName, tags);

      dispatch(timersSlice.actions.timersFetchingSuccess());
      dispatch(getTimers());

      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const deleteTimer = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const result = await timersAPI.deleteTimer(id);

    dispatch(getTimers());
    return result;
  } catch (error: any) {
    console.log(error.response.data.message);
    dispatch(
      timersSlice.actions.timersFetchingError(error.response?.data?.message)
    );
    return error.response.status;
  }
};

export const controlTimer =
  (timerId: number, action: "start" | "stop") =>
  async (dispatch: AppDispatch, getStore: () => RootState) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      if (action === "start") {
        await timersAPI.startTimer(timerId);
      } else if (action === "stop") {
        await timersAPI.stopTimer(timerId);
      }

      dispatch(getTimers());
      dispatch(timersSlice.actions.timersFetchingSuccess());
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const getSubProjectsBySelected =
  (timerId: number, projectName: string) => async (dispatch: AppDispatch) => {
    try {
      let selectionData: projectType[] = (
        await projectsAPI.getSubProjects(timerId)
      ).data;
      let allData: projectType[] = (
        await projectsAPI.getProjects(
          undefined,
          projectName,
          "asc",
          undefined,
          undefined
        )
      ).data;

      let result: (projectType & {
        subProjects: (subProjectType & { isChecked: boolean })[];
      })[] = [];

      allData.map((allDataItem: projectType) => {
        let updatedItem: projectType & {
          subProjects: (subProjectType & { isChecked: boolean })[];
        } = {
          ...allDataItem,
          subProjects: allDataItem.subProjects.map((subProject) => {
            return {
              ...subProject,
              isChecked: selectionData.some((selectionDataItem) =>
                selectionDataItem.subProjects.some(
                  (selectionDataSubProject) =>
                    selectionDataSubProject.id === subProject.id
                )
              ),
            };
          }),
        };

        result.push(updatedItem);
      });

      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const getTagsBySelected =
  (timerId: number, tagName?: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      let allData: tagType[] = [];
      let selectionData: tagType[] = [];

      allData = (await tagsAPI.getTags(undefined, tagName)).data;
      selectionData = (
        await tagsAPI.getTags("asc", tagName, undefined, undefined, timerId)
      ).data;

      let result: (tagType & { isChecked: boolean })[] = [];

      selectionData.sort((a: tagType, b: tagType) => (a.id > b.id ? -1 : 1));

      allData.forEach((item: tagType) => {
        const itemWithChecked: Partial<tagType> & {
          isChecked: boolean;
        } = {
          ...item,
          isChecked: false,
        };

        if (
          selectionData.length > 0 &&
          item.id === selectionData[selectionData.length - 1].id
        ) {
          itemWithChecked.isChecked = true;
          selectionData.pop();
        }
        result.push(itemWithChecked as tagType & { isChecked: boolean });
      });

      dispatch(timersSlice.actions.timersFetchingSuccess());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const setSumTime =
  (timerId: number, sumTime: number) => async (dispatch: AppDispatch) => {
    try {
      const result = await timersAPI.setTimerSum(timerId, sumTime);

      dispatch(getTimers());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const setTimerName =
  (timerId: number, timerName: string) => async (dispatch: AppDispatch) => {
    try {
      const result = await timersAPI.setTimerName(timerId, timerName);

      dispatch(getTimers());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const setTagToTimer =
  (timerId: number, dataId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      let status;

      if (action === "add") {
        status = (await timersAPI.addTagToTimer(dataId, timerId)).status;
      } else if (action === "delete") {
        status = (await timersAPI.removeTagFromTimer(dataId, timerId)).status;
      }

      dispatch(timersSlice.actions.timersFetchingSuccess());
      return status;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const setSubProjectToTimer =
  (timerId: number, dataId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      let status;

      if (action === "add") {
        status = (await timersAPI.addSubProjectToTimer(dataId, timerId)).status;
      } else if (action === "delete") {
        status = (await timersAPI.removeSubProjectFromTimer(dataId, timerId))
          .status;
      }

      return status;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };
