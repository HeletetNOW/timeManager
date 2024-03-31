import React, { useState } from "react";

import { useAppDispatch } from "../../../hooks/hooks";
import { createTag } from "../../../store/tags/ActionCreators";

import Style from "./TagCreateForm.module.css";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";

export const TagCreateForm = React.memo(() => {
  const dispatch = useAppDispatch();

  const [createInputValue, setCreateInputValue] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<{ id: number }[]>(
    []
  );

  const [IsShowProjects, setIsShowProjects] = useState(false);

  const handlerCreateProject = async () => {
    dispatch(createTag(createInputValue, selectedProjects));
  };

  return (
    <div className={Style.createForm}>
      <div className={Style.container}>
        <div className={Style.input}>
          <input
            className={Style.input}
            type="text"
            value={createInputValue}
            onChange={(value) => setCreateInputValue(value.target.value)}
            placeholder="Введите название тега"
          />
        </div>
        <div className={Style.content}>
          <DropListForCreateForm
            dataType="projects"
            selectedDate={selectedProjects}
            setSelectedDate={setSelectedProjects}
            isShow={IsShowProjects}
            setShow={setIsShowProjects}
          />
          <button className={Style.button} onClick={handlerCreateProject}>
            Создать
          </button>
        </div>
      </div>
    </div>
  );
});
