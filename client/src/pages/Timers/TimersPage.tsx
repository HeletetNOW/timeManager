import { useEffect, useState } from "react";
import { TimersCreateForm } from "../../components/Timers/TimersCreateForm/TimersCreateForm";
import { TimersList } from "../../components/Timers/TimersList.tsx/TimersList";
import { getTimers } from "../../store/timers/TimersActionCreator";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TimersSelectDay } from "../../components/Timers/TimersSelecDay/TimersSelectDay";

import Style from "./TimersPage.module.css";
import { Loader } from "../../components/Loader/Loader";

export const TimersPage = () => {
  const [isVisibleLoader, setVisibleLoader] = useState(true);

  const dispatch = useAppDispatch();

  const { timers, selectDate, selectedTags, selectedTimers, isFetching } =
    useAppSelector((state) => state.timersReducer);

  useEffect(() => {
    dispatch(getTimers(selectDate));
  }, [dispatch, selectDate]);

  return isVisibleLoader ? (
    <Loader
      isFetching={isFetching}
      setVisible={setVisibleLoader}
      isVisible={isVisibleLoader}
    />
  ) : (
    <div>
      <div className={Style.header}>
        <TimersSelectDay />
        <TimersCreateForm />
      </div>
      <div className={Style.timers}>
        <TimersList
          timers={selectedTimers === null ? timers : selectedTimers}
          selectedTags={selectedTags}
        />
      </div>
    </div>
  );
};
