import { useEffect, useState } from "react";
import {
  deleteProject,
  getProjects,
  selectProject,
  setProjectInfo,
  setTagToProject,
} from "../../../store/projects/ActionCreators";
import {
  getTags,
  selectTagsWitchCheked,
} from "../../../store/tags/ActionCreators";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import acceptIcon from "../../../imgs/accept.svg";
import noAcceptIcon from "../../../imgs/noAccept.svg";

import cancelIcon from "../../../imgs/cancel.svg";
import checkMarkIcon from "../../../imgs/checkMark.svg";
import editIcon from "../../../imgs/edit.svg";
import deleteProjectIcon from "../../../imgs/deleteProject.svg";

import Style from "./ProjectPage.module.css";
import { useParams } from "react-router-dom";
import { projectsSlice } from "../../../store/projects/ProjectsSlice";
import { DropListForItem } from "../../../components/DropLists/DropLists/DropListForItem/DropListForItem";
import { projectType } from "../../../types/types";
import { TimersCount } from "../../../components/Timers/TimersCount/TimersCount";
import { SubProjectList } from "../../../components/Projects/SubProjectsList/SubProjectList";
import { SubProjectCreateForm } from "../../../components/Projects/SubProjectCreateForm/SubProjectCreateForm";

export const ProjectPage = () => {
  const [isFetching, setFetching] = useState(false);
  const [searchTagName, setSearchTagName] = useState("");
  const [tags, setTags] = useState([]);
  const [isShowTags, setIsShowTags] = useState(false);
  const [editName, setEditName] = useState("");
  const [editText, setEditText] = useState("");

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { selectedProjects, currentEditProject, currentEditSubProject } =
    useAppSelector((state) => state.projectsReducer);

  const currentProject: projectType = selectedProjects[0];
  const isEdit = currentProject?.id === currentEditProject;

  let actionColumn = null;

  const buttonEdit = !isEdit ? (
    <button
      className={`${Style.item} ${Style.editButton}`}
      type="button"
      onClick={() => {
        handlerEditButton(currentProject.id);
      }}
    >
      <img src={editIcon} alt="" />
    </button>
  ) : (
    <button
      type="button"
      className={`${Style.item} ${Style.acceptButton}`}
      onClick={() => handlerAcceptButton(editName, editText)}
    >
      <img src={checkMarkIcon} alt="" />
    </button>
  );

  const buttonDelete = !isEdit ? (
    <button
      type="button"
      className={`${Style.item} ${Style.deleteButton}`}
      onClick={() => handlerDeleteButton(currentProject.id)}
    >
      <img src={deleteProjectIcon} alt="" />
    </button>
  ) : (
    <button
      type="button"
      className={`${Style.item} ${Style.cancelButton}`}
      onClick={() => handlerEditButton(0)}
    >
      <img src={cancelIcon} alt="" />
    </button>
  );

  actionColumn = (
    <div className={Style.actionButtons}>
      <div className={Style.edit}>{buttonEdit}</div>
      <div className={Style.delete}>{buttonDelete}</div>
    </div>
  );

  const titleElement = isEdit ? (
    <input
      defaultValue={editName === "" ? currentProject.projectName : editName}
      onChange={(value) => setEditName(value.target.value)}
    />
  ) : (
    <div className={Style.title}>
      <p>{currentProject?.projectName}</p>
    </div>
  );
  const textElement = isEdit ? (
    <input
      defaultValue={editText === "" ? currentProject.description : editText}
      onChange={(value) => setEditText(value.target.value)}
    />
  ) : (
    <div className={Style.desc}>
      <p>{currentProject?.description}</p>
    </div>
  );

  const updateData = async () => {
    setFetching(true);
    await dispatch(getProjects());
    await dispatch(getTags());
    dispatch(
      projectsSlice.actions.setSelectedProjects(
        await dispatch(selectProject("", [], undefined, Number(id)))
      )
    );
    setFetching(false);
  };

  const handlerSetTag = async (
    id: number,
    tagId: number,
    isChecked: boolean
  ) => {
    setFetching(true);

    const action = isChecked ? "delete" : "add";

    await dispatch(setTagToProject(id, tagId, action));

    await dispatch(getTags());
    await dispatch(getProjects());

    setTags(
      await dispatch(selectTagsWitchCheked(searchTagName, id, "project"))
    );
    setFetching(false);
  };

  const handlerGetTagsByProject = async (id: number, isShowTags: boolean) => {
    setFetching(true);

    if (isShowTags) {
      setIsShowTags(false);
    } else if (!isShowTags) {
      setTags(
        await dispatch(selectTagsWitchCheked(searchTagName, id, "project"))
      );
      setIsShowTags(true);
    }
  };

  const handlerSetSearchTagName = async (value: string, tagId: number) => {
    setSearchTagName(value);
    setTags(await dispatch(selectTagsWitchCheked(value, tagId, "project")));
  };

  useEffect(() => {
    updateData();
  }, []);

  const handlerEditButton = (id: number) => {
    dispatch(projectsSlice.actions.setCurrentEditProjects(id));
    setEditName("");
  };

  const handlerDeleteButton = async (id: number) => {
    await dispatch(deleteProject(id));
    updateData();
  };

  const handlerAcceptButton = async (editName: string, editText: string) => {
    await dispatch(setProjectInfo(editName, editText));
    await updateData();
  };

  if (currentProject !== undefined) {
    return (
      <div className={Style.page}>
        <div className={Style.container}>
          <div className={Style.header}>
            <div className={Style.info}>
              <div className={Style.input}>{titleElement}</div>
              <div className={Style.input}>{textElement}</div>
              <div className={Style.timersCount}>
                <TimersCount sumTime={currentProject.sumTime} />
              </div>
            </div>
            <div className={Style.content}>
              <div
                className={
                  currentProject.status
                    ? `${Style.status}  ${Style.statusTrue}`
                    : `${Style.status} ${Style.statusFalse}`
                }
              >
                <img
                  src={currentProject.status ? acceptIcon : noAcceptIcon}
                  alt=""
                />
              </div>
              <div className={`${Style.tags} ${Style.item}`}>
                {
                  <DropListForItem
                    setSelect={handlerSetTag}
                    searchName={searchTagName}
                    setSearchName={handlerSetSearchTagName}
                    isShow={isShowTags}
                    handlerGetData={handlerGetTagsByProject}
                    dataType="tags"
                    dataId={currentProject.id}
                    data={tags}
                  />
                }
              </div>
              {actionColumn}
            </div>
          </div>
          <div className={Style.main}>
            <SubProjectList
              isFetching={isFetching}
              setFetching={setFetching}
              projectId={currentProject.id}
              isShowSubProjects={true}
              updateData={updateData}
              currentEditSubProject={currentEditSubProject}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Загрузка</div>;
  }
};
