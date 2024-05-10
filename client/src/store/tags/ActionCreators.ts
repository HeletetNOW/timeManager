import { tagsAPI } from "../../app/api/tagsAPI";
import { tagType } from "../../types/types";
import { AppDispatch, RootState } from "../store";
import { tagsSlice } from "./TagsSlice";

export const getTags =
  (tagName?: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { currentSearchTag, order } = getSate().tagsReducer;

      const result = await tagsAPI.getTags(
        order,
        tagName ? tagName : currentSearchTag
      );

      dispatch(tagsSlice.actions.setTags(result.data));
      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setOrder =
  () => async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      let { order } = getSate().tagsReducer;

      if (order === "desc") {
        dispatch(tagsSlice.actions.setOrderToAsc());
        order = "asc";
      } else if (order === "asc") {
        dispatch(tagsSlice.actions.setOrderToDesc());
        order = "desc";
      }

      return 200;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const setTagName =
  (tagName: string) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { currentEditTag } = getSate().tagsReducer;

      if (tagName === "") {
        return dispatch(tagsSlice.actions.setCurrentEditTag(null));
      }

      if (currentEditTag) {
        const result = await tagsAPI.setTagName(tagName, currentEditTag);

        return result.status;
      }
    } catch (error: any) {
      return error.response.status;
    }
  };

export const deleteTag = (id: number) => async (dispatch: AppDispatch) => {
  try {
    const result = await tagsAPI.deleteTag(id);

    return result.status;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.status;
  }
};

export const setProjectToTag =
  (id: number, projectId: number, action: "delete" | "add") =>
  async (dispatch: AppDispatch) => {
    try {
      let status;

      if (action === "add") {
        status = (await tagsAPI.addProjectToTag(projectId, id)).status;
      } else if (action === "delete") {
        status = (await tagsAPI.removeProjectToTag(projectId, id)).status;
      }

      return status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const createTag =
  (tagName: string, projectsId: number[]) => async (dispatch: AppDispatch) => {
    try {
      const result = await tagsAPI.addTag(tagName, projectsId);

      return result.status;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const selectTags =
  (tagName?: string, isSetOrder?: boolean) =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { tags, order, currentSearchTag } = getSate().tagsReducer;

      let searchName = tagName ? tagName : currentSearchTag;

      if (searchName === "" && isSetOrder === false) {
        return dispatch(tagsSlice.actions.setSelectedTags(null));
      }

      let selectDate = tags.filter((tag) =>
        tag.tagName.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
      );

      if (order === "asc") {
        selectDate = selectDate.reverse();
      }

      dispatch(tagsSlice.actions.setSelectedTags(selectDate));
      return selectDate;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };

export const selectTagsWitchCheked =
  (name: string, id: number, type: "timer" | "project") =>
  async (dispatch: AppDispatch, getSate: () => RootState) => {
    try {
      const { tags } = getSate().tagsReducer;

      let allTags = tags.filter((tag) =>
        tag.tagName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );

      let selectedTags: tagType[] = [];

      if (type === "project") {
        selectedTags = allTags.filter((tag) =>
          tag.projects.find((project) => project.id === id)
        );
      } else if (type === "timer") {
        selectedTags = allTags.filter((tag) =>
          tag.timers.find((timer) => timer.id === id)
        );
      }

      let result: (tagType & { isChecked: boolean })[] = [];

      allTags = allTags.sort((a, b) => a.id - b.id);
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

      return result;
    } catch (error: any) {
      console.log(error.response.data.message);
      return error.response.status;
    }
  };
