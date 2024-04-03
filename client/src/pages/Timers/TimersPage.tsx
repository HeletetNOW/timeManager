import { useEffect } from "react";
import { TimersCreateForm } from "../../components/Timers/TimersCreateForm/TimersCreateForm";
import { TimersList } from "../../components/Timers/TimersList.tsx/TimersList";
import { getTimers } from "../../store/timers/TimersActionCreator";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TimersSelectDay } from "../../components/Timers/TimersSelecDay/TimersSelectDay";

import Style from "./TimersPage.module.css";

export const TimersPage = () => {
  const dispatch = useAppDispatch();

  const { timers, selectDate } = useAppSelector((state) => state.timersReducer);

  useEffect(() => {
    dispatch(getTimers(selectDate));
  }, [dispatch, selectDate]);

  useEffect(() => {
    dispatch(getTimers(selectDate));
  }, [dispatch]);

  return (
    <div>
      <div className={Style.header}>
        <TimersSelectDay />
        <TimersCreateForm />
      </div>
      <div className={Style.timers}>
        <TimersList timers={timers} />
      </div>
    </div>
  );
};
