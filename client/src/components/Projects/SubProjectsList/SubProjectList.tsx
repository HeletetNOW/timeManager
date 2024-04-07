import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../hooks/hooks";
import { SubProjectItem } from "../SubProjectItem/SubProjectItem";
import {
  createSubProject,
  deleteSubProject,
  getProjects,
  selectProjectById,
  setSubProjectStatus,
} from "../../../store/projects/ActionCreators";
import { subProjectType } from "../../../types/types";

import Style from "./SubProjectList.module.css";
import { SubProjectCreateForm } from "../SubProjectCreateForm/SubProjectCreateForm";

type Props = {
  isFetching: boolean;
  projectId: number;
  isShowSubProjects: boolean;
  setFetching: (value: boolean) => void;
};

export const SubProjectList = ({
  isFetching,
  setFetching,
  projectId,
  isShowSubProjects,
}: Props) => {
  const dispatch = useAppDispatch();

  const [createFormTitle, setCreateFormTitle] = useState("");
  const [createFormText, setCreateFormText] = useState("");

  const [subProjects, setSubProject] = useState<subProjectType[]>([]);

  const selectSubProjects = async () => {
    await dispatch(getProjects());

    const result = await dispatch(selectProjectById(projectId));

    setSubProject(result.subProjects);
  };

  const handlerCreateSubProject = async () => {
    setFetching(true);
    await dispatch(
      createSubProject(createFormTitle, projectId, createFormText)
    );

    await selectSubProjects();

    setFetching(false);
  };

  const handlerDeleteSubProject = async (subProjectId: number) => {
    await dispatch(deleteSubProject(subProjectId));
    await selectSubProjects();
  };

  const handlerSetSubProjectStatus = async (
    subProjectId: number,
    subProjectStatus: boolean
  ) => {
    await dispatch(setSubProjectStatus(!subProjectStatus, subProjectId));
    await selectSubProjects();
  };

  useEffect(() => {
    selectSubProjects();
  }, []);

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
