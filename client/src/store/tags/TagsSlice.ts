import { createSlice } from "@reduxjs/toolkit";
import { tagType } from "../../types/types";

interface ITagsState {
  order: "desc" | "asc";
  isFailed: boolean;
  error: string;
  tags: tagType[] | [];
  selectedTags: tagType[] | null;
  currentEditTag: number | null;
  currentSearchTag: string;
  currentEditName: string;
  currentTagIsShowProject: number;
}

const initialState: ITagsState = {
  currentEditName: "",
  currentSearchTag: "",
  currentEditTag: null,
  order: "asc",
  isFailed: false,
  error: "",
  selectedTags: null,
  tags: [],
  currentTagIsShowProject: 0,
};

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setCurrentEditName(state, action) {
      state.currentEditName = action.payload;
    },
    setTags(state, action) {
      state.isFailed = false;
      state.error = "";
      state.tags = action.payload;
      state.currentEditTag = null;
    },
    setSelectedTags(state, action) {
      state.isFailed = false;
      state.error = "";
      state.selectedTags = action.payload;
      state.currentEditTag = null;
    },
    setOrderToDesc(state) {
      state.order = "desc";
    },
    setOrderToAsc(state) {
      state.order = "asc";
    },
    setCurrentEditTag(state, action) {
      state.currentEditTag = action.payload;
    },
    setCurrentSearchTag(state, action) {
      state.currentSearchTag = action.payload;
    },
    setCurrentTagIsShowProject(state, action) {
      state.currentTagIsShowProject = action.payload;
    },
  },
});

export default tagsSlice.reducer;
