import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";

import Style from "./ProjectCreateForm.module.css";
import { createProject } from "../../../store/projects/ActionCreators";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";

export const ProjectCreateForm = React.memo(() => {
  const dispatch = useAppDispatch();

  const [createInputValue, setCreateInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [IsShowTags, setIsShowTags] = useState(false);

  const handlerCreateProject = async () => {
    dispatch(createProject(createInputValue, selectedTags));
  };

  return (
    <div className={Style.createForm}>
      <div className={Style.container}>
        <div className={Style.input}>
          <input
            type="text"
            value={createInputValue}
            onChange={(value) => setCreateInputValue(value.target.value)}
            placeholder="Введите название проекта"
          />
        </div>
        <div className={Style.content}>
          <DropListForCreateForm
            dataType="tags"
            isShow={IsShowTags}
            setSelectedDate={setSelectedTags}
            selectedDate={selectedTags}
            setShow={setIsShowTags}
          />
          <button className={Style.button} onClick={handlerCreateProject}>
            Создать
          </button>
        </div>
      </div>
    </div>
  );
});
