import { useState } from "react";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";
import { useAppDispatch } from "../../../hooks/hooks";
import { createTimer } from "../../../store/timers/TimersActionCreator";

import Style from "./TimersCreateForm.module.css";

export const TimersCreateForm = () => {
  const dispatch = useAppDispatch();
  const [timerName, setTimerName] = useState("");

  const [isShowTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const handlerCreateTimer = () => {
    dispatch(createTimer(timerName, selectedTags));
    setTimerName("");
  };

  const handlerSetShowTags = (value: boolean) => {
    setShowTags(value);
  };

  return (
    <div className={Style.container}>
      <input
        className={Style.input}
        placeholder="Введите название таймера"
        value={timerName}
        onChange={(value) => setTimerName(value.target.value)}
      />
      <div className={Style.selectData}>
        <div className={Style.icons}>
          <div className={Style.projects}></div>
          <div className={Style.tags}>
            <DropListForCreateForm
              dataType="tags"
              selectedDate={selectedTags}
              setSelectedDate={setSelectedTags}
              isShow={isShowTags}
              setShow={handlerSetShowTags}
            />
          </div>
        </div>
        <button className={Style.createTimer} onClick={handlerCreateTimer}>
          Добавить
        </button>
      </div>
    </div>
  );
};
