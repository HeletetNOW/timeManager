import Style from "./DropListForItem.module.css";

import tagIcon from "../../../../imgs/tag.svg";
import projectIcon from "../../../../imgs/project.svg";

import { projectType, subProjectType, tagType } from "../../../../types/types";
import { DropElementForProjectsOrTags } from "../../DropElement/DropElementForProjectsOrTags";
import { DropElementForSubProjects } from "../../DropElement/DropElementForSubProjects";

type Props = {
  setSelect: (id: number, dataId: number, isChecked: boolean) => void;
  setSearchName: (value: string, id: number) => void;
  handlerGetData: (currentDateId: number, isShow: boolean) => void;
  dataType: "subProjects" | "tags" | "projects";
  dataId: number;
  searchName: string;
  isShow: boolean;
  data: ((
    | (
        | projectType
        | (projectType & {
            subProjects: (subProjectType & { isChecked: boolean })[];
          })
      )
    | tagType
  ) & { isChecked: boolean })[];
};

export const DropListForItem = ({
  setSelect,
  searchName,
  setSearchName,
  isShow,
  dataId,
  data,
  handlerGetData,
  dataType,
}: Props) => {
  let emptyDataPlaceholder = "";

  let inputPlaceholder = "Введите название ";
  if (dataType === "projects" || dataType === "subProjects") {
    emptyDataPlaceholder = "Проектов пока нет";
    inputPlaceholder += "проекта";
  } else if (dataType === "tags") {
    emptyDataPlaceholder = "Тегов пока нет";
    inputPlaceholder += "тега";
  }
  return (
    <div className={Style.container}>
      <button
        className={Style.button}
        onClick={() => handlerGetData(dataId, isShow)}
      >
        <img
          className={Style.icon}
          src={
            dataType === "projects" || dataType === "subProjects"
              ? projectIcon
              : tagIcon
          }
          alt=""
        />
      </button>
      {isShow ? (
        <div className={Style.main}>
          <form onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              placeholder={inputPlaceholder}
              value={searchName}
              onChange={(value) => setSearchName(value.target.value, dataId)}
            />
          </form>
          <div className={Style.projects}>
            {data.length > 0 ? (
              dataType !== "subProjects" ? (
                data.map((item) => (
                  <DropElementForProjectsOrTags
                    key={item.id}
                    name={
                      dataType === "projects"
                        ? (item as projectType).projectName
                        : (item as tagType).tagName
                    }
                    isConnected={item.isChecked}
                    handlerSetSelected={() => {
                      setSelect(dataId, item.id, item.isChecked);
                    }}
                  />
                ))
              ) : (
                data.map((item) => (
                  <DropElementForSubProjects
                    key={item.id}
                    subProjects={
                      (
                        item as projectType & {
                          subProjects: (subProjectType & {
                            isChecked: boolean;
                          })[];
                        }
                      ).subProjects
                    }
                    name={(item as projectType).projectName}
                    handlerSetSelected={(
                      isChecked: boolean,
                      subProjectId: number
                    ) => {
                      setSelect(dataId, subProjectId, isChecked);
                    }}
                  />
                ))
              )
            ) : (
              <div className={Style.emptyData}>{emptyDataPlaceholder}</div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
