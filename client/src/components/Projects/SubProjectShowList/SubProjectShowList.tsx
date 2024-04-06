import Style from "./SubProjectShowList.module.css";

import triangle from "../../../imgs/triangle.svg";

import projectIcon from "../../../imgs/project.svg";

type Props = {
  isShowSubProjects: boolean;
  setShowSubProject: (value: number) => void;
  projectId: number;
  isFetching: boolean;
};

export const SubProjectShowList = ({
  isFetching,
  projectId,
  setShowSubProject,
  isShowSubProjects,
}: Props) => {
  const windowWidth = window.innerWidth;

  return (
    <button
      onClick={() => setShowSubProject(projectId)}
      className={`${Style.subProject} ${isFetching ? Style.isFetching : ""}`}
    >
      {windowWidth > 1000 ? (
        <>
          Подзадачи
          <img
            className={Style.triangle}
            src={isShowSubProjects ? triangle : triangle}
            alt=""
          />
        </>
      ) : (
        <img className={Style.icons} src={projectIcon} alt="" />
      )}
    </button>
  );
};
