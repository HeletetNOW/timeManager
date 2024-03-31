import { authAPI } from "../../app/api/authAPI";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";

export const loginAuth =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.authFetching());

      const result = await authAPI.login(email, password);
      dispatch(authSlice.actions.setUserInfo(result.data));

      dispatch(authSlice.actions.authFetchingSuccess());
      return result;
    } catch (error: any) {
      dispatch(
        authSlice.actions.authFetchingError(error.response?.data?.message)
      );
    }
  };

export const registerAuth =
  (name: string, surname: string, email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.authFetching());

      const result = await authAPI.register(name, surname, email, password);
      dispatch(authSlice.actions.setUserInfo(result.data));

      dispatch(authSlice.actions.authFetchingSuccess());
      return result;
    } catch (error: any) {
      dispatch(
        authSlice.actions.authFetchingError(error.response?.data?.message)
      );
    }
  };

export const currentAuth = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(authSlice.actions.authFetching());

    const result = await authAPI.current();
    dispatch(authSlice.actions.setUserInfo(result.data));

    dispatch(authSlice.actions.authFetchingSuccess());

    return result.status;
  } catch (error: any) {
    console.log(error.response.data.message);
    dispatch(
      authSlice.actions.authFetchingError(error.response?.data?.message)
    );
    dispatch(authSlice.actions.setUserInfo(null));
    return error.response.status;
  }
};
