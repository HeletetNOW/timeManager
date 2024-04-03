import { useState } from "react";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";
import { useAppDispatch } from "../../../hooks/hooks";
import { createTimer } from "../../../store/timers/TimersActionCreator";

import Style from "./TimersCreateForm.module.css";

export const TimersCreateForm = () => {
  const dispatch = useAppDispatch();
  const [timerName, setTimerName] = useState("");

  const [isShowProjects, setShowProjects] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<{ id: number }[]>(
    []
  );

  const [isShowTags, setShowTags] = useState(false);
  const [selectedTags, setSelectedTags] = useState<{ id: number }[]>([]);

  const handlerCreateTimer = () => {
    dispatch(createTimer(timerName, selectedProjects, selectedTags));
    setTimerName("");
  };

  const handlerSetShowTags = (value: boolean) => {
    setShowProjects(isShowProjects ? !isShowProjects : isShowProjects);
    setShowTags(value);
  };

  const handlerSetShowProjects = (value: boolean) => {
    setShowTags(isShowTags ? !isShowTags : isShowTags);
    setShowProjects(value);
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
        <div className={Style.projects}>
          <DropListForCreateForm
            dataType="projects"
            selectedDate={selectedProjects}
            setSelectedDate={setSelectedProjects}
            isShow={isShowTags ? false : isShowProjects}
            setShow={handlerSetShowProjects}
          />
        </div>
        <div className={Style.tags}>
          <DropListForCreateForm
            dataType="tags"
            selectedDate={selectedTags}
            setSelectedDate={setSelectedTags}
            isShow={isShowProjects ? false : isShowTags}
            setShow={handlerSetShowTags}
          />
        </div>
        <button className={Style.createTimer} onClick={handlerCreateTimer}>
          Добавить
        </button>
      </div>
    </div>
  );
};
