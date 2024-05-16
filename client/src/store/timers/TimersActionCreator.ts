import { timersAPI } from "../../app/api/timersAPI";
import { tagType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { timersSlice } from "./TimersSlice";

export const getTimers =
  (date?: number) =>
  async (dispatch: AppDispatch, getStore: () => RootState) => {
    try {
      dispatch(timersSlice.actions.timersFetching());
      const { selectDate } = getStore().timersReducer;

      const result = await timersAPI.getTimers(date ? date : selectDate);

      dispatch(timersSlice.actions.setTimers(result.data));
      dispatch(timersSlice.actions.timersFetchingSuccess());

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(timersSlice.actions.timersFetchingError(error.data.message));
      return error.response.status;
    }
  };

export const createTimer =
  (timerName: string, tags?: number[]) =>
  async (dispatch: AppDispatch, getStore: () => RootState) => {
    try {
      const { selectDate } = getStore().timersReducer;
      const result = await timersAPI.createTimer(timerName, tags, selectDate);

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const deleteTimer = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const result = await timersAPI.deleteTimer(id);

    return result.status;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.status;
  }
};

export const controlTimer =
  (timerId: number, action: "start" | "stop") =>
  async (dispatch: AppDispatch) => {
    try {
      let result;
      if (action === "start") {
        result = await timersAPI.startTimer(timerId);
      } else if (action === "stop") {
        result = await timersAPI.stopTimer(timerId);
      }
      return result?.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const selectTags =
  (tagName: string, tags: tagType[]) => (dispatch: AppDispatch) => {
    try {
      let selectDate = tags.filter((tag) =>
        tag.tagName.toLocaleLowerCase().includes(tagName.toLocaleLowerCase())
      );

      dispatch(timersSlice.actions.setSelectedTags(selectDate));
      return 200;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setSumTime =
  (timerId: number, sumTime: number) => async (dispatch: AppDispatch) => {
    try {
      const result = await timersAPI.setTimerSum(timerId, sumTime);

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setTimerName =
  (timerId: number, timerName: string) => async (dispatch: AppDispatch) => {
    try {
      const result = await timersAPI.setTimerName(timerId, timerName);

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setTagToTimer =
  (timerId: number, dataId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      let status;

      if (action === "add") {
        status = (await timersAPI.addTagToTimer(dataId, timerId)).status;
      } else if (action === "delete") {
        status = (await timersAPI.removeTagFromTimer(dataId, timerId)).status;
      }

      return status;
    } catch (error: any) {
      console.log(error.response.data.message);
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
      return error.response.status;
    }
  };
