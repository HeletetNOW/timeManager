import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import Style from "./TimerSelectDay.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { timersSlice } from "../../../store/timers/TimersSlice";

import sortArrowDown from "../../../imgs/sortArrowDown.svg";
import sortArrowUp from "../../../imgs/sortArrowUp.svg";

export const TimersSelectDay = () => {
  const dispatch = useAppDispatch();
  const [showCalendar, setShowCalendar] = useState(false);

  const { selectDate } = useAppSelector((state) => state.timersReducer);

  return (
    <div className={Style.container}>
      <div
        className={Style.selectDate}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        {new Date(selectDate).toLocaleDateString()}
        <div className={Style.arrow}>
          <img src={showCalendar ? sortArrowUp : sortArrowDown} alt="" />
        </div>
      </div>
      <div className={Style.calendar}>
        {showCalendar ? (
          <Calendar
            value={new Date(selectDate)}
            onChange={(value) => {
              if (value instanceof Date) {
                dispatch(timersSlice.actions.setSelectDate(value.getTime()));
              }
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
