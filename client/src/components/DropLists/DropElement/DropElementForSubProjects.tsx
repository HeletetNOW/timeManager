import { subProjectType } from "../../../types/types";
import Style from "./DropElement.module.css";

import triangle from "../../../imgs/triangle.svg";
import { useState } from "react";

type Props = {
  handlerSetSelected: (isChecked: boolean, subProjectId: number) => void;
  name: string;
  subProjects?: (subProjectType & { isChecked: boolean })[];
};

export const DropElementForSubProjects = ({
  handlerSetSelected,
  name,
  subProjects,
}: Props) => {
  const [isActive, setActive] = useState(false);
  return (
    <div className={Style.item}>
      <div className={Style.subProjectContainer}>
        <div
          className={Style.subProjectName}
          onClick={() => setActive(!isActive)}
        >
          <img
            className={isActive ? Style.isActive : Style.noActive}
            src={triangle}
            alt=""
          />
          {name}
        </div>
        <div className={Style.list}>
          {isActive ? (
            subProjects?.map((item) => {
              return (
                <div key={item.id} className={Style.subProject}>
                  <input
                    type="checkbox"
                    defaultChecked={item.isChecked}
                    onChange={() => handlerSetSelected(item.isChecked, item.id)}
                  />
                  <div>{item.subProjectName}</div>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
