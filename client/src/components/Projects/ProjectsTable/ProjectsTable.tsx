import { useAppDispatch } from "../../../hooks/hooks";
import { selectProject } from "../../../store/projects/ActionCreators";
import Style from "./ProjectsTable.module.css";

import sortArrowUp from "../../../imgs/sortArrowUp.svg";
import sortArrowDown from "../../../imgs/sortArrowDown.svg";
import { SearchElement } from "../../SearchElement/SearchElement";
import React, { useEffect, useState } from "react";
import { projectsSlice } from "../../../store/projects/ProjectsSlice";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";

type Props = {
  order: "desc" | "asc";
  currentSearchProject: string;
  sortBy: "projectName" | "status" | "";
};

export const ProjectsTable = React.memo(
  ({ order, currentSearchProject, sortBy }: Props) => {
    const dispatch = useAppDispatch();

    const setInputValue = (value: string) => {
      dispatch(projectsSlice.actions.setCurrentSearchProjects(value));
      dispatch(selectProject(value));
    };

    const onSubmitInput = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.currentTarget.blur();
      dispatch(selectProject(currentSearchProject));
    };

    const toggleSortBy = (sortBy: "projectName" | "status" | "") => {
      dispatch(projectsSlice.actions.setSortBy(sortBy));
      if (order === "asc") {
        dispatch(projectsSlice.actions.setOrderToDesc());
      } else if (order === "desc") {
        dispatch(projectsSlice.actions.setOrderToAsc());
      }
      dispatch(selectProject(currentSearchProject));
    };

    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [IsShowTags, setIsShowTags] = useState(false);

    useEffect(() => {
      dispatch(selectProject(currentSearchProject, selectedTags));
    }, [selectedTags, IsShowTags, dispatch]);

    return (
      <div className={Style.container}>
        <div className={Style.content}>
          <div className={Style.actions}>
            <div
              className={Style.sortForm}
              onClick={() => toggleSortBy("projectName")}
            >
              <div className={Style.title}>Название</div>
              {sortBy === "projectName" ? (
                <img
                  src={order === "asc" ? sortArrowDown : sortArrowUp}
                  alt=""
                />
              ) : (
                <img src={sortArrowDown} alt="" />
              )}
            </div>
            <div
              className={Style.sortForm}
              onClick={() => toggleSortBy("status")}
            >
              <div className={Style.title}>Статус</div>
              {sortBy === "status" ? (
                <img
                  src={order === "asc" ? sortArrowDown : sortArrowUp}
                  alt=""
                />
              ) : (
                <img src={sortArrowDown} alt="" />
              )}
            </div>
            <div className={Style.sortForm}>
              <div className={Style.title}>
                <DropListForCreateForm
                  setShow={setIsShowTags}
                  setSelectedDate={setSelectedTags}
                  selectedDate={selectedTags}
                  dataType="tags"
                  isShow={IsShowTags}
                />
              </div>
            </div>
          </div>

          <div className={Style.search}>
            <SearchElement
              inputTitle="Введите название проекта"
              onChangeInput={setInputValue}
              inputValue={currentSearchProject}
              onSubmitInput={onSubmitInput}
            />
          </div>
        </div>
      </div>
    );
  }
);
