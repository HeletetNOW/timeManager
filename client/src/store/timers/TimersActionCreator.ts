import { projectsAPI } from "../../app/api/projectsAPI";
import { tagsAPI } from "../../app/api/tagsAPI";
import { timersAPI } from "../../app/api/timersAPI";
import { projectType, tagType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { timersSlice } from "./TimersSlice";

export const getTimers = (date: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(timersSlice.actions.timersFetching());

    const result = await timersAPI.getTimers(date);

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
  (timerName: string, projects?: { id: number }[], tags?: { id: number }[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      const result = await timersAPI.createTimer(timerName, projects, tags);

      dispatch(timersSlice.actions.timersFetchingSuccess());
      dispatch(getTimers(new Date().getTime()));
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

    dispatch(getTimers(new Date().getTime()));
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
      const { selectDate } = getStore().timersReducer;
      dispatch(timersSlice.actions.timersFetching());

      if (action === "start") {
        await timersAPI.startTimer(timerId);
      } else if (action === "stop") {
        await timersAPI.stopTimer(timerId);
      }

      dispatch(getTimers(selectDate));
      dispatch(timersSlice.actions.timersFetchingSuccess());
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        timersSlice.actions.timersFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const getDataBySelected =
  (
    dataType: "tag" | "project",
    timerId: number,
    tagName?: string,
    projectName?: string
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      let allData: (tagType | projectType)[] = [];
      let selectionData: (tagType | projectType)[] = [];

      if (dataType === "project") {
        allData = (await projectsAPI.getProjects(undefined, projectName)).data;
        selectionData = (
          await projectsAPI.getProjects(
            undefined,
            projectName,
            "asc",
            undefined,
            undefined,
            timerId
          )
        ).data;
      } else if (dataType === "tag") {
        allData = (await tagsAPI.getTags(undefined, tagName)).data;
        selectionData = (
          await tagsAPI.getTags("asc", tagName, undefined, undefined, timerId)
        ).data;
      }

      let result: ((tagType | projectType) & { isChecked: boolean })[] = [];

      selectionData.sort((a: tagType | projectType, b: tagType | projectType) =>
        a.id > b.id ? -1 : 1
      );

      allData.forEach((item: tagType | projectType) => {
        const itemWithChecked: Partial<tagType | projectType> & {
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
        result.push(
          itemWithChecked as (tagType | projectType) & { isChecked: boolean }
        );
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

export const setDataToTimer =
  (
    dataIdType: "tag" | "project",
    timerId: number,
    dataId: number,
    action: "delete" | "add"
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(timersSlice.actions.timersFetching());

      let status;

      if (action === "add") {
        if (dataIdType === "tag") {
          status = (await timersAPI.addTagToTimer(dataId, timerId)).status;
        } else if (dataIdType === "project") {
          status = (await timersAPI.addProjectToTimer(dataId, timerId)).status;
        }
      } else if (action === "delete") {
        if (dataIdType === "tag") {
          status = (await timersAPI.removeTagFromTimer(dataId, timerId)).status;
        } else if (dataIdType === "project") {
          status = (await timersAPI.removeProjectFromTimer(dataId, timerId))
            .status;
        }
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
