import Style from "./DropListForItem.module.css";
import triangleDown from "../../../../imgs/triangleDown.svg";
import triangleUp from "../../../../imgs/triangleUp.svg";
import { projectType, tagType } from "../../../../types/types";
import { DropElement } from "../../DropElement/DropElement";

import tagIcon from "../../../../imgs/tag.svg";
import projectIcon from "../../../../imgs/project.svg";

type Props = {
  setSelect: (id: number, dataId: number, isChecked: boolean) => void;
  setSearchName: (value: string, id: number) => void;
  handlerGetData: (currentDateId: number, isShow: boolean) => void;
  dataType: "projects" | "tags";
  dataId: number;
  searchName: string;
  isShow: boolean;
  data: ((projectType | tagType) & { isChecked: boolean })[];
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
  const windowWidth = window.innerWidth;

  let inputPlaceholder = "Введите название ";
  let title = "";
  if (dataType === "projects") {
    inputPlaceholder += "проекта";
    title = "Проекты";
  } else if (dataType === "tags") {
    inputPlaceholder += "тега";
    title = "Теги";
  }

  return (
    <div className={Style.container}>
      <button
        className={Style.button}
        onClick={() => handlerGetData(dataId, isShow)}
      >
        {windowWidth > 1000 ? (
          <>
            {title}
            <img
              className={Style.triangle}
              src={isShow ? triangleUp : triangleDown}
              alt=""
            />
          </>
        ) : (
          <img
            className={Style.icons}
            src={dataType === "projects" ? projectIcon : tagIcon}
            alt=""
          />
        )}
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
            {data.map((item) => (
              <DropElement
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
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
