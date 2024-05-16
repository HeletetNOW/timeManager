import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import {
  controlTimer,
  deleteTimer,
  setTagToTimer,
  setSumTime,
  setTimerName,
  setSubProjectToTimer,
  getTimers,
} from "../../../store/timers/TimersActionCreator";
import { tagType, timerType } from "../../../types/types";
import { DropListForItem } from "../../DropLists/DropLists/DropListForItem/DropListForItem";
import { TimersItem } from "../TimersItem/TimersItem";
import { timersSlice } from "../../../store/timers/TimersSlice";

import Style from "./TimerList.module.css";
import {
  getTags,
  selectTagsWitchCheked,
} from "../../../store/tags/ActionCreators";
import {
  getProjects,
  selectSubProjects,
} from "../../../store/projects/ActionCreators";

type Props = {
  timers: timerType[] | [];
  selectedTags: tagType[] | null;
};

export const TimersList = ({ timers, selectedTags }: Props) => {
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
    await dispatch(getTimers());
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
    setTimerShowProjects(0);
    setFetching(true);

    if (isShow) {
      setTimerShowTags(0);
      setFetching(false);
    } else {
      setTags(
        await dispatch(selectTagsWitchCheked(searcTagName, timerId, "timer"))
      );

      setTimerShowTags(timerId);
      setFetching(false);
    }
  };

  const handlerGetSubProjectsByTimer = async (
    timerId: number,
    isShow: boolean
  ) => {
    setFetching(true);
    setTimerShowTags(0);

    if (isShow) {
      setTimerShowProjects(0);
    } else {
      setProjects(
        await dispatch(selectSubProjects(timerId, searchProjectName))
      );

      setTimerShowProjects(timerId);
    }
  };

  const handlerSetSearchProjectName = async (value: string, id: number) => {
    setSearchProjectName(value);
    setProjects(await dispatch(selectSubProjects(id, value)));
  };

  const handlerSetCurrentEditTimer = (id: number) => {
    dispatch(timersSlice.actions.setCurrentEditTimer(id));
  };

  const handlerSetSearchTagName = async (value: string, timerId: number) => {
    setSearchTagName(value);
    setTags(await dispatch(selectTagsWitchCheked(value, timerId, "timer")));
  };

  const handlerSetTags = async (
    id: number,
    tagId: number,
    isChecked: boolean
  ) => {
    setFetching(true);

    const action = isChecked ? "delete" : "add";

    await dispatch(setTagToTimer(id, tagId, action));
    await dispatch(getTags());
    setTags(await dispatch(selectTagsWitchCheked(searcTagName, id, "timer")));

    setFetching(false);
  };

  const handlerSetSubProjects = async (
    id: number,
    subProjectId: number,
    isChecked: boolean
  ) => {
    setFetching(true);
    const action = isChecked ? "delete" : "add";

    await dispatch(setSubProjectToTimer(id, subProjectId, action));
    await dispatch(getProjects());
    setProjects(await dispatch(selectSubProjects(id, searchProjectName)));
    setFetching(false);
  };

  const handlerDeleteTimer = (timerId: number) => {
    setFetching(true);
    dispatch(deleteTimer(timerId));
    setFetching(false);
  };

  const handlerSetSumTime = async (
    timerId: number,
    hours: string,
    minutes: string,
    seconds: string
  ) => {
    setFetching(true);
    const sumTime =
      Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

    await dispatch(setSumTime(timerId, sumTime));
    await dispatch(getTimers());
    setFetching(false);
  };

  const handlerSetTimerName = async (timerId: number, timerName: string) => {
    setFetching(true);
    dispatch(setTimerName(timerId, timerName));
    setFetching(false);
  };

  const initialLoad = async () => {
    await dispatch(getTags());
    await dispatch(getProjects());

    handlerGetSubProjectsByTimer(currentTimerIsShowProjects, false);
    handlerGetTagsByTimer(currentTimerIsShowTags, false);
  };

  useEffect(() => {
    initialLoad();
  }, []);

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
                sumTime={timer.sumTime}
                timerName={timer.timerName}
                isEdit={isEdit}
                tagsList={
                  <DropListForItem
                    setSelect={handlerSetTags}
                    searchName={searcTagName}
                    setSearchName={handlerSetSearchTagName}
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
