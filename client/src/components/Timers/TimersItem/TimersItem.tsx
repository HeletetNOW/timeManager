import { useEffect, useState } from "react";
import { projectType } from "../../../types/types";
import { TimersCount } from "../TimersCount/TimersCount";

import Style from "./TimersItem.module.css";

import pauseTimerIcon from "../../../imgs/pauseTimer.svg";
import startTimerIcon from "../../../imgs/startTimer.svg";

type Props = {
  timerControl: (timerId: number, action: "start" | "stop") => void;
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
  sumTime,
  timerControl,
  projectsList,
  tagsList,
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
        {pauseTimer ? (
          <img
            alt=""
            className={Style.buttonControl}
            src={startTimerIcon}
            onClick={handlerStartTimer}
          />
        ) : (
          <img
            alt=""
            className={Style.buttonControl}
            src={pauseTimerIcon}
            onClick={handlerStopTimer}
          />
        )}
        <div className={Style.projectsList}>{projectsList}</div>
        <div className={Style.tagsList}>{tagsList}</div>
      </div>
    </div>
  );
};
