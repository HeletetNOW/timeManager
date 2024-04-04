import { useEffect, useState } from "react";
import { projectType } from "../../../types/types";
import { TimersCount } from "../TimersCount/TimersCount";

import Style from "./TimersItem.module.css";

import pauseTimerIcon from "../../../imgs/pauseTimer.svg";
import startTimerIcon from "../../../imgs/startTimer.svg";

type Props = {
  timerControl: (timerId: number, action: "start" | "stop") => void;
  handlerDeleteTimer: (id: number) => void;
  handlerSetCurrentEditTimer: (id: number) => void;
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
  sumTime,
  timerControl,
  projectsList,
  tagsList,
  handlerDeleteTimer,
  handlerSetCurrentEditTimer,
}: Props) => {
  const [currentTime, setCurrentTime] = useState(sumTime);

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
    <div className={Style.container}>
      <div className={Style.info}>
        <div className={Style.title}>{timerName}</div>
        <div className={Style.count}>
          <TimersCount currentTime={currentTime} />
        </div>
      </div>
      <div className={Style.actions}>
        <div className={Style.icons}>
          {pauseTimer ? (
            <div onClick={handlerStartTimer} className={Style.buttonControl}>
              <img alt="" src={startTimerIcon} />
            </div>
          ) : (
            <div onClick={handlerStopTimer} className={Style.buttonControl}>
              <img alt="" src={pauseTimerIcon} />
            </div>
          )}
          <div className={Style.projectsList}>{projectsList}</div>
          <div className={Style.tagsList}>{tagsList}</div>
        </div>
        <div className={Style.setData}>
          <div className={Style.changeName}>
            {isEdit ? (
              <>
                <button
                  className={`${Style.title} ${Style.saveButton}`}
                  onClick={() => {}}
                >
                  Сохранить
                </button>
                <button
                  className={`${Style.title} ${Style.cancelButton}`}
                  onClick={() => handlerSetCurrentEditTimer(0)}
                >
                  Отмена
                </button>
              </>
            ) : (
              <>
                <button
                  className={`${Style.title} ${Style.changeNameButton}`}
                  onClick={() => handlerSetCurrentEditTimer(timerId)}
                >
                  Изменить
                </button>
                <div className={Style.delete}>
                  <button
                    onClick={() => handlerDeleteTimer(timerId)}
                    className={`${Style.title} ${Style.deleteButton}`}
                  >
                    Удалить
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
