import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { createTag } from "../../../store/tags/ActionCreators";

import Style from "./TagCreateForm.module.css";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";

type Props = {
  updateAllData: () => void;
};

export const TagCreateForm = ({ updateAllData }: Props) => {
  const dispatch = useAppDispatch();

  const [createInputValue, setCreateInputValue] = useState("");
  const [selectedProjectsByCreate, setSelectedProjectsByCreate] = useState<
    number[]
  >([]);

  const [IsShowProjects, setIsShowProjects] = useState(false);

  const handlerCreateTag = async () => {
    await dispatch(createTag(createInputValue, selectedProjectsByCreate));
    updateAllData();
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
            selectedData={selectedProjectsByCreate}
            setSelectedDate={setSelectedProjectsByCreate}
            isShow={IsShowProjects}
            setShow={setIsShowProjects}
          />
          <button className={Style.button} onClick={handlerCreateTag}>
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};
