import { Link } from "react-router-dom";
import Style from "./ProjectsItem.module.css";

type Props = {
  handlerEditButton: (value: number) => void;
  setEditName: (value: string) => void;
  handlerAcceptButton: (value: string) => void;
  handlerDeleteButton: (value: number) => void;
  editName: string;
  projectId: number;
  projectName: string;
  isEdit: boolean;
  status: boolean;
  tags: React.ReactComponentElement<any>;
  subProjects: React.ReactComponentElement<any>;
};

export const ProjectItem = ({
  projectName,
  status,
  tags,
  isEdit,
  projectId,
  editName,
  subProjects,
  setEditName,
  handlerEditButton,
  handlerAcceptButton,
  handlerDeleteButton,
}: Props) => {
  let actionColumn = null;

  const windowWidth = window.innerWidth;

  const buttonEdit = !isEdit ? (
    <button
      className={Style.item}
      type="button"
      onClick={() => {
        handlerEditButton(projectId);
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
      className={Style.item}
      onClick={() => handlerAcceptButton("")}
    >
      Отмена
    </button>
  ) : null;

  const buttonDelete = !isEdit ? (
    <button
      type="button"
      className={Style.item}
      onClick={() => handlerDeleteButton(projectId)}
    >
      Удалить
    </button>
  ) : null;

  actionColumn = (
    <div className={Style.actionButtons}>
      {windowWidth > 800 ? (
        <>
          <Link to={"/"} className={`${Style.item} ${Style.link}`}>
            Подробнее...
          </Link>
          <div className={Style.edit}>{buttonEdit}</div>
          <div className={Style.accept}>{buttonApply}</div>
          <div className={Style.cancel}>{buttonCancel}</div>
          <div className={Style.delete}>{buttonDelete}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  const nameElement = isEdit ? (
    <div className={Style.textarea}>
      <input
        className={Style.input}
        defaultValue={editName === "" ? projectName : editName}
        onChange={(value) => setEditName(value.target.value)}
      />
    </div>
  ) : (
    <div className={Style.title}>{projectName}</div>
  );

  return (
    <div className={Style.container}>
      <div className={Style.item}>{nameElement}</div>
      <div className={Style.content}>
        <div
          className={
            status
              ? `${Style.status}  ${Style.statusTrue}`
              : `${Style.status} ${Style.statusFalse}`
          }
        >
          {status ? "Выполнено" : "Не выполнено"}
        </div>
        <div className={Style.tags}>{tags}</div>
        <div className={`${Style.projects} ${Style.subProjects}`}>
          {subProjects}
        </div>
        {actionColumn}
      </div>
    </div>
  );
};
