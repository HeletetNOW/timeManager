import Style from "./SubProjectItem.module.css";

import acceptIcon from "../../../imgs/accept.svg";
import noAcceptIcon from "../../../imgs/noAccept.svg";
import editIcon from "../../../imgs/edit.svg";
import cancelIcon from "../../../imgs/cancel.svg";

import deleteSubProjectIcon from "../../../imgs/deleteSubProject.svg";
import checkMarkIcon from "../../../imgs/checkMark.svg";
import { TimersCount } from "../../Timers/TimersCount/TimersCount";

type Props = {
  subProjectId: number;
  subProjectTitle: string;
  subProjectStatus: boolean;
  subProjectSumTime: number;
  isEdit: boolean;
  subProjectDescription: string;
  handlerSetSubProjectStatus: (
    subProjectId: number,
    subProjectStatus: boolean
  ) => void;
  editTitle: string;
  editText: string;
  handlerEditSubProject: (subProjectId: number) => void;
  handlerDeleteSubProject: (subProjectId: number) => void;
  setEditTitle: (value: string) => void;
  setEditText: (value: string) => void;
  handlerAcceptButton: () => void;
};

export const SubProjectItem = ({
  subProjectTitle,
  subProjectId,
  editText,
  setEditTitle,
  editTitle,
  isEdit,
  subProjectSumTime,
  subProjectStatus,
  subProjectDescription,
  handlerDeleteSubProject,
  handlerSetSubProjectStatus,
  handlerEditSubProject,
  handlerAcceptButton,
  setEditText,
}: Props) => {
  const buttonEdit = !isEdit ? (
    <button
      className={`${Style.item} ${Style.editButton}`}
      type="button"
      onClick={() => {
        handlerEditSubProject(subProjectId);
      }}
    >
      <img src={editIcon} alt="" />
    </button>
  ) : (
    <button
      type="button"
      className={`${Style.item} ${Style.acceptButton}`}
      onClick={() => handlerAcceptButton()}
    >
      <img src={checkMarkIcon} alt="" />
    </button>
  );

  const buttonDelete = !isEdit ? (
    <button
      type="button"
      className={`${Style.item} ${Style.deleteButton}`}
      onClick={() => handlerDeleteSubProject(subProjectId)}
    >
      <img src={deleteSubProjectIcon} alt="" />
    </button>
  ) : (
    <button
      type="button"
      className={`${Style.item} ${Style.cancelButton}`}
      onClick={() => handlerEditSubProject(0)}
    >
      <img src={cancelIcon} alt="" />
    </button>
  );

  const titleElement = isEdit ? (
    <input
      defaultValue={editTitle === "" ? subProjectTitle : editTitle}
      onChange={(value) => setEditTitle(value.target.value)}
    />
  ) : (
    <div className={Style.title}>
      <p>{subProjectTitle}</p>
    </div>
  );
  const textElement = isEdit ? (
    <input
      defaultValue={editText === "" ? subProjectDescription : editText}
      onChange={(value) => setEditText(value.target.value)}
    />
  ) : (
    <div className={Style.title}>
      <p>{subProjectDescription}</p>
    </div>
  );

  return (
    <div className={Style.item}>
      <div className={Style.title}>{titleElement}</div>
      <div className={Style.desc}>{textElement}</div>
      <TimersCount sumTime={subProjectSumTime} />
      <div className={Style.content}>
        <div
          className={Style.status}
          onClick={() =>
            handlerSetSubProjectStatus(subProjectId, subProjectStatus)
          }
        >
          {subProjectStatus ? (
            <div className={Style.complete}>
              <img src={acceptIcon} alt="" />
            </div>
          ) : (
            <div className={Style.noComplete}>
              <img src={noAcceptIcon} alt="" />
            </div>
          )}
        </div>
        <div className={Style.buttons}>
          {buttonEdit}
          {buttonDelete}
        </div>
      </div>
    </div>
  );
};
