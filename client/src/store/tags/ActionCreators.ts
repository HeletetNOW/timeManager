import { tagsAPI } from "../../app/api/tagsAPI";
import { tagType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { tagsSlice } from "./TagsSlice";

export const getTags =
  (tagName?: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      dispatch(tagsSlice.actions.tagsFetching());

      const { currentSearchTag, order } = getSate().tagsReducer;

      const result = await tagsAPI.getTags(
        order,
        tagName ? tagName : currentSearchTag
      );

      dispatch(tagsSlice.actions.setTags(result.data));
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const setOrder =
  () => async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      dispatch(tagsSlice.actions.tagsFetching());

      let { order, currentSearchTag } = getSate().tagsReducer;

      if (order === "desc") {
        dispatch(tagsSlice.actions.setOrderToAsc());
        order = "asc";
      } else if (order === "asc") {
        dispatch(tagsSlice.actions.setOrderToDesc());
        order = "desc";
      }

      const result = await tagsAPI.getTags(order, currentSearchTag);
      dispatch(tagsSlice.actions.setTags(result.data));

      dispatch(tagsSlice.actions.tagsFetchingSuccess());
    } catch (error: any) {
      dispatch(
        tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const setTagName =
  (tagName: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      dispatch(tagsSlice.actions.tagsFetching());

      const { currentEditTag } = getSate().tagsReducer;

      if (tagName === "") {
        return dispatch(tagsSlice.actions.setCurrentEditTag(null));
      }

      if (currentEditTag) {
        const result = await tagsAPI.setTagName(tagName, currentEditTag);
        dispatch(getTags());

        dispatch(tagsSlice.actions.tagsFetchingSuccess());
        return result.status;
      } else {
        tagsSlice.actions.tagsFetchingError("Невозможно изменить имя тега");
      }
    } catch (error: any) {
      dispatch(
        tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const deleteTag = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(tagsSlice.actions.tagsFetching());

    const result = await tagsAPI.deleteTag(id);

    dispatch(getTags());
    dispatch(tagsSlice.actions.tagsFetchingSuccess());
    return result.status;
  } catch (error: any) {
    dispatch(
      tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
    );
    return error.response.status;
  }
};

export const setProjectToTag =
  (id: number, projectId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(tagsSlice.actions.tagsFetching());

      let status;

      if (action === "add") {
        status = (await tagsAPI.addProjectToTag(projectId, id)).status;
      } else if (action === "delete") {
        status = (await tagsAPI.removeProjectToTag(projectId, id)).status;
      }

      dispatch(tagsSlice.actions.tagsFetchingSuccess());
      return status;
    } catch (error: any) {
      dispatch(
        tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const createTag =
  (tagName: string, projectsId: { id: number }[]) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(tagsSlice.actions.tagsFetching());

      const result = await tagsAPI.addTag(tagName, projectsId);

      dispatch(tagsSlice.actions.tagsFetchingSuccess());
      dispatch(getTags());
      return result.status;
    } catch (error: any) {
      dispatch(
        tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };

export const getTagsByProjectIdSelected =
  (projectId: number, tagName: string | undefined) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(tagsSlice.actions.tagsFetching());
      let allTags = (await tagsAPI.getTags(undefined, tagName)).data;
      let selectedTags = (
        await tagsAPI.getTags("asc", tagName, undefined, projectId)
      ).data;

      let result: (tagType & { isChecked: boolean })[] = [];

      selectedTags.sort((a: tagType, b: tagType) => (a.id > b.id ? -1 : 1));

      allTags.forEach((item: tagType) => {
        const itemWithChecked: Partial<tagType> & { isChecked: boolean } = {
          ...item,
          isChecked: false,
        };

        if (
          selectedTags.length > 0 &&
          item.id === selectedTags[selectedTags.length - 1].id
        ) {
          itemWithChecked.isChecked = true;
          selectedTags.pop();
        }
        result.push(itemWithChecked as tagType & { isChecked: boolean });
      });

      dispatch(tagsSlice.actions.tagsFetchingSuccess());
      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(
        tagsSlice.actions.tagsFetchingError(error.response?.data?.message)
      );
      return error.response.status;
    }
  };
