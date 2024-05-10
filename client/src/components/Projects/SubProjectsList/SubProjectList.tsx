import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { SubProjectItem } from "../SubProjectItem/SubProjectItem";
import {
  createSubProject,
  deleteSubProject,
  selectProjectById,
  setSubProjectInfo,
  setSubProjectStatus,
} from "../../../store/projects/ActionCreators";
import { subProjectType } from "../../../types/types";

import Style from "./SubProjectList.module.css";
import { SubProjectCreateForm } from "../SubProjectCreateForm/SubProjectCreateForm";
import { projectsSlice } from "../../../store/projects/ProjectsSlice";

type Props = {
  isFetching: boolean;
  projectId: number;
  isShowSubProjects: boolean;
  currentEditSubProject: number;
  setFetching: (value: boolean) => void;
  updateData: () => Promise<void>;
};

export const SubProjectList = ({
  isFetching,
  setFetching,
  projectId,
  isShowSubProjects,
  currentEditSubProject,
  updateData,
}: Props) => {
  const dispatch = useAppDispatch();

  const [createFormTitle, setCreateFormTitle] = useState("");
  const [createFormText, setCreateFormText] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");

  const [subProjects, setSubProject] = useState<subProjectType[]>([]);

  const selectSubProjects = async () => {
    const result = await dispatch(selectProjectById(projectId));
    setSubProject(result);
  };

  const handlerEditSubProject = async (subProjectId: number) => {
    dispatch(projectsSlice.actions.setCurrentEditSubProject(subProjectId));
    setEditTitle("");
    setEditText("");
  };

  const handlerCreateSubProject = async () => {
    setFetching(true);
    await dispatch(
      createSubProject(createFormTitle, projectId, createFormText)
    );
    setCreateFormText("");
    setCreateFormTitle("");
    await updateData();
    await selectSubProjects();
    setFetching(false);
  };

  const handlerDeleteSubProject = async (subProjectId: number) => {
    await dispatch(deleteSubProject(subProjectId));
    await updateData();
    await selectSubProjects();
  };

  const handlerSetSubProjectStatus = async (
    subProjectId: number,
    subProjectStatus: boolean
  ) => {
    await dispatch(setSubProjectStatus(!subProjectStatus, subProjectId));
    await updateData();
    await selectSubProjects();
  };

  const handlerAcceptButton = async () => {
    await dispatch(setSubProjectInfo(editTitle, editText));
    await updateData();
    await selectSubProjects();
  };

  useEffect(() => {
    selectSubProjects();
  }, [projectId]);

  if (isShowSubProjects) {
    return (
      <div
        className={`${Style.container} ${isFetching ? Style.isFetching : ""}`}
      >
        <div className={Style.list}>
          <div className={Style.items}>
            <>
              <div className={Style.createItem}>
                <SubProjectCreateForm
                  formText={createFormText}
                  setFormText={setCreateFormText}
                  formTitle={createFormTitle}
                  setFormTitle={setCreateFormTitle}
                  onSubmit={handlerCreateSubProject}
                />
              </div>
              <div className={Style.subProjectsContainer}>
                <div className={Style.subProjects}>
                  {subProjects.length > 0 ? (
                    subProjects.map((subProject) => {
                      return (
                        <SubProjectItem
                          setEditTitle={setEditTitle}
                          setEditText={setEditText}
                          editTitle={editTitle}
                          editText={editText}
                          isEdit={
                            currentEditSubProject === subProject.id
                              ? true
                              : false
                          }
                          handlerAcceptButton={handlerAcceptButton}
                          handlerEditSubProject={handlerEditSubProject}
                          subProjectDescription={subProject.description}
                          handlerDeleteSubProject={handlerDeleteSubProject}
                          subProjectTitle={subProject.subProjectName}
                          subProjectId={subProject.id}
                          subProjectStatus={subProject.status}
                          handlerSetSubProjectStatus={
                            handlerSetSubProjectStatus
                          }
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};
