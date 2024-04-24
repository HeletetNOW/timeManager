import { useAppDispatch } from "../../../hooks/hooks";
import {
  selectProject,
  setSortProjects,
} from "../../../store/projects/ActionCreators";
import Style from "./ProjectsTable.module.css";

import sortArrowUp from "../../../imgs/sortArrowUp.svg";
import sortArrowDown from "../../../imgs/sortArrowDown.svg";
import { SearchElement } from "../../SearchElement/SearchElement";
import React, { useEffect, useState } from "react";
import { DropListForCreateForm } from "../../DropLists/DropLists/DropListForCreateForm/DropListForCreateForm";

type Props = {
  order: "desc" | "asc";
  currentSearchProject: string;
  sortBy: "projectName" | "status" | "";
  isFetching: boolean;
  setFetching: (value: boolean) => void;
  setSearchProjectName: (value: string) => void;
};

export const ProjectsTable = React.memo(
  ({
    order,
    currentSearchProject,
    sortBy,
    setFetching,
    isFetching,
    setSearchProjectName,
  }: Props) => {
    const dispatch = useAppDispatch();

    const [selectedTags, setSelectedTags] = useState<number[]>([]);
    const [IsShowTags, setIsShowTags] = useState(false);

    const onSubmitInput = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.currentTarget.blur();
      setSearchProjectName(currentSearchProject);
    };

    const toggleSortBy = (sort: "projectName" | "status" | "") => {
      setFetching(true);
      dispatch(setSortProjects(sort));
      setFetching(false);
    };

    useEffect(() => {
      dispatch(selectProject(currentSearchProject, selectedTags));
    }, [
      selectedTags,
      IsShowTags,
      currentSearchProject,
      order,
      sortBy,
      dispatch,
    ]);

    return (
      <div
        className={
          isFetching
            ? `${Style.container} ${Style.isFetching}`
            : `${Style.container}`
        }
      >
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
                  selectedData={selectedTags}
                  dataType="tags"
                  isShow={IsShowTags}
                />
              </div>
            </div>
          </div>

          <div className={Style.search}>
            <SearchElement
              inputTitle="Введите название проекта"
              onChangeInput={setSearchProjectName}
              inputValue={currentSearchProject}
              onSubmitInput={onSubmitInput}
            />
          </div>
        </div>
      </div>
    );
  }
);
