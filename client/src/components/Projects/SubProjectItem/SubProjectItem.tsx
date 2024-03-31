import Style from "./SubProjectItem.module.css";

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

      <div className={Style.content}>
        <div className={Style.desc}>{subProjectDescription}</div>

        <div className={Style.status}>
          {subProjectStatus ? (
            <div className={Style.complete}>Выполнено</div>
          ) : (
            <div className={Style.noComplete}>Не выполнено</div>
          )}
        </div>
        <div className={Style.buttons}>
          <button
            onClick={() =>
              handlerSetSubProjectStatus(subProjectId, subProjectStatus)
            }
          >
            {subProjectStatus ? "Не выполнено" : "Выполнено"}
          </button>
          <button
            className={Style.deleteButton}
            onClick={() => handlerDeleteSubProject(subProjectId)}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};
