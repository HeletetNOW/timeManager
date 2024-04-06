import { useEffect, useState } from "react";
import { projectType } from "../../../types/types";
import { TimersCount } from "../TimersCount/TimersCount";

import Style from "./TimersItem.module.css";

import checkMarkIcon from "../../../imgs/checkMark.svg";
import cancelIcon from "../../../imgs/cancel.svg";
import deleteTimerIcon from "../../../imgs/deleteTimer.svg";
import editIcon from "../../../imgs/edit.svg";
import pauseTimerIcon from "../../../imgs/pauseTimer.svg";
import startTimerIcon from "../../../imgs/startTimer.svg";

type Props = {
  timerControl: (timerId: number, action: "start" | "stop") => void;
  handlerDeleteTimer: (id: number) => void;
  handlerSetCurrentEditTimer: (id: number) => void;
  handlerSetTimerName: (timerId: number, timerName: string) => void;
  handlerSetSumTime: (
    timerId: number,
    hours: string,
    minutes: string,
    seconds: string
  ) => void;
  isFetching: boolean;
  isEdit: boolean;
  timerId: number;
  pauseTimer: boolean;
  projects: projectType[];
  sumTime: number;
  timerName: string;
  tagsList: React.ReactComponentElement<any>;
  projectsList: React.ReactComponentElement<any>;
};

export const TimersItem = ({
  timerName,
  pauseTimer,
  timerId,
  isEdit,
  isFetching,
  sumTime,
  timerControl,
  projectsList,
  tagsList,
  handlerDeleteTimer,
  handlerSetCurrentEditTimer,
  handlerSetSumTime,
  handlerSetTimerName,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(sumTime);
  const [editTimerName, setEditTimerName] = useState(timerName);

  const hours = Math.floor(currentTime / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((currentTime % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (currentTime % 60).toString().padStart(2, "0");

  const [editHours, setEditHours] = useState(hours);
  const [editMinutes, setEditMinutes] = useState(minutes);
  const [editSeconds, setEditSeconds] = useState(seconds);

  useEffect(() => {
    let idInterval: NodeJS.Timer | null = null;
    if (!pauseTimer) {
      idInterval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (idInterval) {
        clearInterval(idInterval);
      }
    };
  }, [pauseTimer]);

  useEffect(() => {
    setCurrentTime(sumTime);
  }, [sumTime, setCurrentTime]);

  const handlerStartTimer = () => {
    timerControl(timerId, "start");
  };

  const handlerStopTimer = () => {
    timerControl(timerId, "stop");
  };

  return (
    <div
      className={`${Style.container} ${
        isFetching ? Style.isFetchingContainer : ""
      }`}
    >
      <div className={Style.info}>
        <div className={Style.title}>
          {isEdit ? (
            <input
              className={Style.editTimerInput}
              type="text"
              value={editTimerName}
              onChange={(event) => setEditTimerName(event.target.value)}
            />
          ) : (
            timerName
          )}
        </div>
        <div className={Style.count}>
          {isEdit ? (
            <>
              <input
                type="text"
                maxLength={2}
                value={editHours}
                className={Style.setTimerInput}
                onChange={(event) => setEditHours(event.target.value)}
              />
              :
              <input
                type="text"
                maxLength={2}
                value={editMinutes}
                className={Style.setTimerInput}
                onChange={(event) => setEditMinutes(event.target.value)}
              />
              :
              <input
                type="text"
                maxLength={2}
                value={editSeconds}
                className={Style.setTimerInput}
                onChange={(event) => setEditSeconds(event.target.value)}
              />
            </>
          ) : (
            <TimersCount hours={hours} minutes={minutes} seconds={seconds} />
          )}
        </div>
      </div>
      <div className={Style.actions}>
        <div className={Style.icons}>
          {pauseTimer ? (
            <button onClick={handlerStartTimer} className={Style.buttonControl}>
              <img
                alt=""
                src={startTimerIcon}
                className={isFetching ? Style.isFetching : ""}
              />
            </button>
          ) : (
            <button onClick={handlerStopTimer} className={Style.buttonControl}>
              <img
                alt=""
                src={pauseTimerIcon}
                className={isFetching ? Style.isFetching : ""}
              />
            </button>
          )}
          <div
            className={`${Style.projectsList} ${
              isFetching ? Style.dropListsFetching : ""
            }`}
          >
            {projectsList}
          </div>
          <div
            className={`${Style.tagsList} ${
              isFetching ? Style.dropListsFetching : ""
            }`}
          >
            {tagsList}
          </div>
        </div>
        <div className={Style.setData}>
          <div className={Style.changeName}>
            {isEdit ? (
              <>
                <button
                  className={`${Style.title} ${Style.saveButton}`}
                  onClick={() => {
                    handlerSetTimerName(timerId, editTimerName);
                    handlerSetSumTime(
                      timerId,
                      editHours,
                      editMinutes,
                      editSeconds
                    );
                  }}
                >
                  <img
                    src={checkMarkIcon}
                    alt=""
                    className={isFetching ? Style.isFetching : ""}
                  />
                </button>
                <button
                  className={`${Style.title} ${Style.cancelButton}`}
                  onClick={() => {
                    handlerSetCurrentEditTimer(0);
                    setEditTimerName(timerName);
                  }}
                >
                  <img
                    src={cancelIcon}
                    alt=""
                    className={isFetching ? Style.isFetching : ""}
                  />
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${Style.title} ${Style.changeNameButton}`}
                  onClick={() => handlerSetCurrentEditTimer(timerId)}
                >
                  <img
                    src={editIcon}
                    alt=""
                    className={isFetching ? Style.isFetching : ""}
                  />
                </button>
                <div className={Style.delete}>
                  <button
                    onClick={() => handlerDeleteTimer(timerId)}
                    className={`${Style.title} ${Style.deleteButton}`}
                  >
                    <img
                      src={deleteTimerIcon}
                      alt=""
                      className={isFetching ? Style.isFetching : ""}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
