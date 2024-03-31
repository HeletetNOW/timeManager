import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

import authReducer from "./auth/AuthSlice";
import tagsReducer from "./tags/TagsSlice";
import projectsReducer from "./projects/ProjectsSlice";
import timersReducer from "./timers/TimersSlice";

const rootReducer = combineReducers({
  authReducer,
  tagsReducer,
  projectsReducer,
  timersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = setupStore();
