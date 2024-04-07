import { Link } from "react-router-dom";
import Style from "./ProjectsItem.module.css";

import acceptIcon from "../../../imgs/accept.svg";
import noAcceptIcon from "../../../imgs/noAccept.svg";

import cancelIcon from "../../../imgs/cancel.svg";
import checkMarkIcon from "../../../imgs/checkMark.svg";
import editIcon from "../../../imgs/edit.svg";
import deleteProjectIcon from "../../../imgs/deleteProject.svg";

import showMoreIcon from "../../../imgs/showMore.svg";
import { TimersCount } from "../../Timers/TimersCount/TimersCount";

type Props = {
  handlerEditButton: (value: number) => void;
  setEditName: (value: string) => void;
  handlerAcceptButton: (value: string) => void;
  handlerDeleteButton: (value: number) => void;
  sumTime: number;
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
  sumTime,
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
        handlerEditButton(projectId);
      }}
    >
      <img src={editIcon} alt="" />
    </button>
  ) : (
    <button
      type="button"
      className={`${Style.item} ${Style.acceptButton}`}
      onClick={() => handlerAcceptButton(editName)}
    >
      <img src={checkMarkIcon} alt="" />
    </button>
  );

  const buttonDelete = !isEdit ? (
    <button
      type="button"
      className={`${Style.item} ${Style.deleteButton}`}
      onClick={() => handlerDeleteButton(projectId)}
    >
      <img src={deleteProjectIcon} alt="" />
    </button>
  ) : (
    <button
      type="button"
      className={`${Style.item} ${Style.cancelButton}`}
      onClick={() => handlerAcceptButton("")}
    >
      <img src={cancelIcon} alt="" />
    </button>
  );

  actionColumn = (
    <div className={Style.actionButtons}>
      <Link to={"/"} className={`${Style.item} ${Style.link}`}>
        <img src={showMoreIcon} alt="" />
      </Link>
      <div className={Style.edit}>{buttonEdit}</div>
      <div className={Style.delete}>{buttonDelete}</div>
    </div>
  );

  const nameElement = isEdit ? (
    <input
      defaultValue={editName === "" ? projectName : editName}
      onChange={(value) => setEditName(value.target.value)}
    />
  ) : (
    <div className={Style.title}>
      <p>{projectName}</p>
    </div>
  );

  return (
    <div className={Style.container}>
      <div className={Style.info}>
        <div className={Style.input}>{nameElement}</div>
        <div className={Style.timersCount}>
          <TimersCount
            hours={Math.floor(sumTime / 3600)
              .toString()
              .padStart(2, "0")}
            minutes={Math.floor((sumTime % 3600) / 60)
              .toString()
              .padStart(2, "0")}
            seconds={Math.floor(sumTime % 60)
              .toString()
              .padStart(2, "0")}
          />
        </div>
      </div>
      <div className={Style.content}>
        <div
          className={
            status
              ? `${Style.status}  ${Style.statusTrue}`
              : `${Style.status} ${Style.statusFalse}`
          }
        >
          <img src={status ? acceptIcon : noAcceptIcon} alt="" />
        </div>

        <div className={`${Style.tags} ${Style.item}`}>{tags}</div>
        <div className={`${Style.projects} ${Style.item}`}>{subProjects}</div>
        {actionColumn}
      </div>
    </div>
  );
};
