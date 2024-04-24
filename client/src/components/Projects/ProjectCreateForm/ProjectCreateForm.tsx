import React, { useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";

import Style from "./ProjectCreateForm.module.css";
import { createProject } from "../../../store/projects/ActionCreators";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";

type Props = {
  updateData: () => void;
};

export const ProjectCreateForm = React.memo(({ updateData }: Props) => {
  const dispatch = useAppDispatch();

  const [createInputValue, setCreateInputValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [IsShowTags, setIsShowTags] = useState(false);

  const handlerCreateProject = async () => {
    await dispatch(createProject(createInputValue, selectedTags));
    await updateData();
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
            selectedData={selectedTags}
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
