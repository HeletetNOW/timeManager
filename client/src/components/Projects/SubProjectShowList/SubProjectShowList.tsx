import Style from "./SubProjectShowList.module.css";

import subProjectIcon from "../../../imgs/subProjects.svg";

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
}: Props) => {
  return (
    <button
      onClick={() => setShowSubProject(projectId)}
      className={`${Style.subProject} ${isFetching ? Style.isFetching : ""}`}
    >
      <img src={subProjectIcon} alt="" />
    </button>
  );
};
