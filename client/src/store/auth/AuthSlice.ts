import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isFetching: boolean;
  isFaled: boolean;
  error: string;
  userInfo: {
    id: number;
    email: string;
    name: string;
    surname: string;
  } | null;
}

const initialState: IAuthState = {
  isFetching: false,
  isFaled: false,
  error: "",
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authFetching(state) {
      state.isFetching = true;
    },
    authFetchingSuccess(state) {
      state.isFetching = false;
      state.isFaled = false;
      state.error = "";
    },
    authFetchingError(state, action) {
      state.isFetching = false;
      state.isFaled = true;
      state.error = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export default authSlice.reducer;
