import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  controlTimer,
  deleteTimer,
  getTagsBySelected,
  setTagToTimer,
  setSumTime,
  setTimerName,
  getSubProjectsBySelected,
  setSubProjectToTimer,
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
    setFetching(true);
    await dispatch(controlTimer(timerId, action));
    setFetching(false);
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
    setTags(await dispatch(getTagsBySelected(timerId, searcTagName)));
    setTimerShowProjects(0);
    setTimerShowTags(isShow ? 0 : timerId);
  };

  const handlerGetSubProjectsByTimer = async (
    timerId: number,
    isShow: boolean
  ) => {
    setFetching(true);
    setProjects(
      await dispatch(getSubProjectsBySelected(timerId, searchProjectName))
    );
    setTimerShowTags(0);
    setTimerShowProjects(isShow ? 0 : timerId);
  };

  const handlerSetSearchProjectName = async (value: string, id: number) => {
    setSearchProjectName(value);
    setProjects(await dispatch(getSubProjectsBySelected(id, value)));
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

    dispatch(setTagToTimer(id, tagId, action));
    setTags(await dispatch(getTagsBySelected(id, searcTagName)));
  };

  const handlerSetSubProjects = async (
    id: number,
    subProjectId: number,
    isChecked: boolean
  ) => {
    setFetching(true);
    const action = isChecked ? "delete" : "add";

    await dispatch(setSubProjectToTimer(id, subProjectId, action));
    setProjects(
      await dispatch(getSubProjectsBySelected(id, searchProjectName))
    );
    setFetching(false);
  };

  const handlerDeleteTimer = (timerId: number) => {
    setFetching(true);
    dispatch(deleteTimer(timerId));
    setFetching(false);
  };

  const handlerSetSumTime = (
    timerId: number,
    hours: string,
    minutes: string,
    seconds: string
  ) => {
    setFetching(true);
    const sumTime =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    dispatch(setSumTime(timerId, sumTime));
    setFetching(false);
  };

  const handlerSetTimerName = (timerId: number, timerName: string) => {
    setFetching(true);
    dispatch(setTimerName(timerId, timerName));
    setFetching(false);
  };

  return (
    <div className={Style.container}>
      {timers.length > 0 ? (
        timers.map((timer) => {
          const isEdit = timer.id === currentEditTimer;
          return (
            <div
              className={Style.item}
              key={timer.id}
              aria-disabled={isFetching}
            >
              <TimersItem
                isFetching={isFetching}
                handlerSetTimerName={handlerSetTimerName}
                handlerSetSumTime={handlerSetSumTime}
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
                    setSelect={handlerSetSubProjects}
                    searchName={searchProjectName}
                    setSearchName={handlerSetSearchProjectName}
                    isShow={
                      timer.id === currentTimerIsShowProjects &&
                      !currentTimerIsShowTags
                        ? true
                        : false
                    }
                    dataType="subProjects"
                    handlerGetData={handlerGetSubProjectsByTimer}
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
