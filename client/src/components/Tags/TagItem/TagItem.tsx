import { projectType } from "../../../types/types";

import Style from "./TagItem.module.css";

type Props = {
  handlerEditButton: (value: number) => void;
  setEditName: (value: string) => void;
  handlerAcceptButton: (value: string) => void;
  handlerDeleteButton: (value: number) => void;
  editName: string;
  id: number;
  tagName: string;
  projects: projectType[];
  isEdit: boolean;
  children: React.ReactComponentElement<any>;
};

export const TagItem = ({
  children,
  tagName,
  isEdit,
  id,
  editName,
  setEditName,
  handlerEditButton,
  handlerAcceptButton,
  handlerDeleteButton,
}: Props) => {
  let actionColumn = null;

  const buttonEdit = !isEdit ? (
    <button
      className={Style.item}
      type="button"
      onClick={() => {
        handlerEditButton(id);
      }}
    >
      Изменить
    </button>
  ) : null;
  const buttonApply = isEdit ? (
    <button
      type="button"
      className={Style.item}
      onClick={() => handlerAcceptButton(editName)}
    >
      Сохранить
    </button>
  ) : null;
  const buttonCancel = isEdit ? (
    <button
      type="button"
      className={Style.cancelButton}
      onClick={() => handlerAcceptButton("")}
    >
      Отмена
    </button>
  ) : null;

  const buttonDelete = !isEdit ? (
    <button
      type="button"
      className={Style.deleteButton}
      onClick={() => handlerDeleteButton(id)}
    >
      Удалить
    </button>
  ) : null;

  actionColumn = (
    <div className={Style.actionButtons}>
      {buttonEdit}
      {buttonApply}
      {buttonCancel}
      {buttonDelete}
    </div>
  );

  const nameElement = isEdit ? (
    <div className={Style.textarea}>
      <input
        className={Style.input}
        defaultValue={editName === "" ? tagName : editName}
        onChange={(value) => setEditName(value.target.value)}
      />
    </div>
  ) : (
    <div className={Style.title}> {tagName}</div>
  );

  return (
    <div className={Style.container}>
      <div className={Style.item}>{nameElement}</div>
      <div className={Style.projects}>{children}</div>
      {actionColumn}
    </div>
  );
};
