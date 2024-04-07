import { projectType } from "../../../types/types";

import Style from "./TagItem.module.css";

import editIcon from "../../../imgs/edit.svg";
import cancelIcon from "../../../imgs/cancel.svg";
import deleteIcon from "../../../imgs/deleteTag.svg";
import checkMarkIcon from "../../../imgs/checkMark.svg";

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
      className={`${Style.item} ${Style.editButton}`}
      type="button"
      onClick={() => {
        handlerEditButton(id);
      }}
    >
      <img src={editIcon} alt="" />
    </button>
  ) : null;
  const buttonApply = isEdit ? (
    <button
      type="button"
      className={`${Style.item} ${Style.acceptButton}`}
      onClick={() => handlerAcceptButton(editName)}
    >
      <img src={checkMarkIcon} alt="" />
    </button>
  ) : null;
  const buttonCancel = isEdit ? (
    <button
      type="button"
      className={`${Style.cancelButton} ${Style.item}`}
      onClick={() => handlerAcceptButton("")}
    >
      <img src={cancelIcon} alt="" />
    </button>
  ) : null;

  const buttonDelete = !isEdit ? (
    <button
      type="button"
      className={`${Style.deleteButton} ${Style.item}`}
      onClick={() => handlerDeleteButton(id)}
    >
      <img src={deleteIcon} alt="" />
    </button>
  ) : null;

  actionColumn = (
    <div className={Style.actionsButtons}>
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
    <div className={Style.title}>{tagName}</div>
  );

  return (
    <div className={Style.container}>
      {nameElement}
      <div className={Style.actions}>
        <button className={`${Style.projects} ${Style.item}`}>
          {children}
        </button>
        {actionColumn}
      </div>
    </div>
  );
};
