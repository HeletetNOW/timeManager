import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  controlTimer,
  deleteTimer,
  getDataBySelected,
  setDataToTimer,
} from "../../../store/timers/TimersActionCreator";
import { timerType } from "../../../types/types";
import { DropListForItem } from "../../DropLists/DropLists/DropListForItem/DropListForItem";
import { TimersItem } from "../TimersItem/TimersItem";
import { timersSlice } from "../../../store/timers/TimersSlice";

import Style from "./TimerList.module.css";

type Props = {
  timers: timerType[] | [];
};

export const TimersList = ({ timers }: Props) => {
  const [searcTagName, setSearchTagName] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [projects, setProjects] = useState([]);

  const [isFetching, setFetching] = useState(false);

  const {
    currentTimerIsShowTags,
    currentTimerIsShowProjects,
    currentEditTimer,
  } = useAppSelector((state) => state.timersReducer);

  const dispatch = useAppDispatch();

  const handlerControlTimer = async (
    timerId: number,
    action: "start" | "stop"
  ) => {
    dispatch(controlTimer(timerId, action));
  };

  const setTimerShowProjects = (timerId: number) => {
    dispatch(timersSlice.actions.setCurrentTimerIsShowProjects(timerId));
    setFetching(false);
  };
  const setTimerShowTags = (timerId: number) => {
    dispatch(timersSlice.actions.setCurrentTimerIsShowTags(timerId));
    setFetching(false);
  };

  const handlerGetTagsByTimer = async (timerId: number, isShow: boolean) => {
    setFetching(true);
    setTags(await dispatch(getDataBySelected("tag", timerId, searcTagName)));
    setTimerShowProjects(0);
    setTimerShowTags(isShow ? 0 : timerId);
  };

  const handlerGetProjectsByTimer = async (
    timerId: number,
    isShow: boolean
  ) => {
    setFetching(true);
    setProjects(
      await dispatch(
        getDataBySelected("project", timerId, undefined, searchProjectName)
      )
    );
    setTimerShowTags(0);
    setTimerShowProjects(isShow ? 0 : timerId);
  };

  const handlerSetSearchProjectName = async (value: string, id: number) => {
    setSearchProjectName(value);
    setProjects(
      await dispatch(getDataBySelected("project", id, undefined, value))
    );
  };

  const handlerSetCurrentEditTimer = (id: number) => {
    dispatch(timersSlice.actions.setCurrentEditTimer(id));
  };

  const handlerSetTags = async (
    id: number,
    tagId: number,
    isChecked: boolean
  ) => {
    const action = isChecked ? "delete" : "add";

    dispatch(setDataToTimer("tag", id, tagId, action));
    setTags(await dispatch(getDataBySelected("tag", id, searcTagName)));
  };

  const handlerSetProjects = async (
    id: number,
    projectId: number,
    isChecked: boolean
  ) => {
    const action = isChecked ? "delete" : "add";

    dispatch(setDataToTimer("project", id, projectId, action));
    setProjects(
      await dispatch(
        getDataBySelected("project", id, undefined, searchProjectName)
      )
    );
  };

  const handlerDeleteTimer = (timerId: number) => {
    setFetching(true);
    dispatch(deleteTimer(timerId));
    setFetching(false);
  };

  return (
    <div className={Style.container}>
      {timers.length > 0 ? (
        timers.map((timer) => {
          const isEdit = timer.id === currentEditTimer;
          return (
            <div
              className={`${Style.item} ${isFetching ? Style.isFetching : ""}`}
              key={timer.id}
              aria-disabled={isFetching}
            >
              <TimersItem
                handlerSetCurrentEditTimer={handlerSetCurrentEditTimer}
                handlerDeleteTimer={handlerDeleteTimer}
                timerControl={handlerControlTimer}
                timerId={timer.id}
                pauseTimer={timer.pauseTimer}
                projects={timer.projects}
                sumTime={timer.sumTime}
                timerName={timer.timerName}
                isEdit={isEdit}
                tagsList={
                  <DropListForItem
                    setSelect={handlerSetTags}
                    searchName={searcTagName}
                    setSearchName={setSearchTagName}
                    isShow={
                      timer.id === currentTimerIsShowTags &&
                      !currentTimerIsShowProjects
                        ? true
                        : false
                    }
                    dataType="tags"
                    handlerGetData={handlerGetTagsByTimer}
                    data={tags}
                    dataId={timer.id}
                  />
                }
                projectsList={
                  <DropListForItem
                    setSelect={handlerSetProjects}
                    searchName={searchProjectName}
                    setSearchName={handlerSetSearchProjectName}
                    isShow={
                      timer.id === currentTimerIsShowProjects &&
                      !currentTimerIsShowTags
                        ? true
                        : false
                    }
                    dataType="projects"
                    handlerGetData={handlerGetProjectsByTimer}
                    data={projects}
                    dataId={timer.id}
                  />
                }
              />
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
