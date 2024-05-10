import Style from "./TagsPage.module.css";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setProjectToTag,
  deleteTag,
  getTags,
  setTagName,
} from "../../store/tags/ActionCreators";
import { TagsTable } from "../../components/Tags/TagsTable/TagsTable";
import { TagItem } from "../../components/Tags/TagItem/TagItem";
import { tagsSlice } from "../../store/tags/TagsSlice";
import {
  getProjects,
  selectProjectsByTagId,
} from "../../store/projects/ActionCreators";
import { TagCreateForm } from "../../components/Tags/TagCreateForm/TagCreateForm";
import { DropListForItem } from "../../components/DropLists/DropLists/DropListForItem/DropListForItem";

export const TagsPage = () => {
  const [searchProjectName, setSearchProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const dispatch = useAppDispatch();
  const {
    order,
    tags,
    selectedTags,
    currentEditTag,
    currentEditName,
    currentSearchTag,
    currentTagIsShowProject,
  } = useAppSelector((state) => state.tagsReducer);

  const handlerEditButton = (id: number) => {
    dispatch(tagsSlice.actions.setCurrentEditTag(id));
    dispatch(tagsSlice.actions.setCurrentEditName(""));
  };
  const handlerAcceptButton = (editName: string) => {
    dispatch(setTagName(editName));
  };
  const handlerDeleteButton = async (id: number) => {
    await dispatch(deleteTag(id));
    updateAllData();
  };

  const setIsShowProjects = (id: number) => {
    dispatch(tagsSlice.actions.setCurrentTagIsShowProject(id));
    setFetching(false);
  };

  const handlerGetProjectsByTag = async (id: number, isShow: boolean) => {
    if (isShow) {
      setIsShowProjects(0);
    } else if (!isShow) {
      setFetching(true);
      setProjects(await dispatch(selectProjectsByTagId(id, searchProjectName)));
      setIsShowProjects(id);
    }
  };

  const handlerSetProject = async (
    id: number,
    projectId: number,
    isChecked: boolean
  ) => {
    const action = isChecked ? "delete" : "add";

    await dispatch(setProjectToTag(id, projectId, action));
    await dispatch(getProjects());

    setProjects(await dispatch(selectProjectsByTagId(id, searchProjectName)));
  };

  const handlerSetSearchProjectName = async (value: string, id: number) => {
    setSearchProjectName(value);
    setProjects(await dispatch(selectProjectsByTagId(id, value)));
  };

  const updateAllData = () => {
    dispatch(getTags());
    dispatch(getProjects());
  };

  useEffect(() => {
    updateAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={Style.container}>
      <div className={Style.dataSelect}>
        <TagsTable order={order} currentSearchTag={currentSearchTag} />
        <TagCreateForm updateAllData={updateAllData} />
      </div>
      <div className={Style.tagsContainer}>
        <div className={Style.tags}>
          {(selectedTags === null ? tags : selectedTags).map((tag) => {
            const isEdit = tag.id === currentEditTag;
            return (
              <TagItem
                handlerEditButton={handlerEditButton}
                setEditName={(editName) =>
                  dispatch(tagsSlice.actions.setCurrentEditName(editName))
                }
                handlerAcceptButton={handlerAcceptButton}
                handlerDeleteButton={handlerDeleteButton}
                editName={currentEditName}
                id={tag.id}
                tagName={tag.tagName}
                projects={tag.projects}
                isEdit={isEdit}
                key={tag.id}
              >
                <div className={isFetching ? Style.isFetching : ""}>
                  <DropListForItem
                    setSelect={handlerSetProject}
                    searchName={searchProjectName}
                    setSearchName={handlerSetSearchProjectName}
                    isShow={tag.id === currentTagIsShowProject ? true : false}
                    dataType="projects"
                    handlerGetData={handlerGetProjectsByTag}
                    dataId={tag.id}
                    data={projects}
                  />
                </div>
              </TagItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};
