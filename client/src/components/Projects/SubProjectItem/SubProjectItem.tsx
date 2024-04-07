import Style from "./SubProjectItem.module.css";

import acceptIcon from "../../../imgs/accept.svg";
import noAcceptIcon from "../../../imgs/noAccept.svg";

import deleteSubProjectIcon from "../../../imgs/deleteSubProject.svg";

type Props = {
  subProjectId: number;
  subProjectTitle: string;
  subProjectStatus: boolean;
  subProjectDescription: string;
  handlerSetSubProjectStatus: (
    subProjectId: number,
    subProjectStatus: boolean
  ) => void;
  handlerDeleteSubProject: (subProjectId: number) => void;
};

export const SubProjectItem = ({
  subProjectTitle,
  subProjectId,
  subProjectStatus,
  subProjectDescription,
  handlerDeleteSubProject,
  handlerSetSubProjectStatus,
}: Props) => {
  return (
    <div className={Style.item}>
      <div className={Style.title}>{subProjectTitle}</div>
      <div className={Style.desc}>{subProjectDescription}</div>
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
          <button
            className={Style.deleteButton}
            onClick={() => handlerDeleteSubProject(subProjectId)}
          >
            <img src={deleteSubProjectIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
