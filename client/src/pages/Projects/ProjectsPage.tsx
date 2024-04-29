import Style from "./ProjectsPage.module.css";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getTags,
  selectTagsWitchCheked,
} from "../../store/tags/ActionCreators";
import {
  deleteProject,
  getProjects,
  selectProject,
  setProjectName,
  setTagToProject,
} from "../../store/projects/ActionCreators";
import { ProjectsTable } from "../../components/Projects/ProjectsTable/ProjectsTable";
import { ProjectCreateForm } from "../../components/Projects/ProjectCreateForm/ProjectCreateForm";
import { ProjectItem } from "../../components/Projects/ProjectItem/ProjectItem";
import { projectsSlice } from "../../store/projects/ProjectsSlice";
import { SubProjectShowList } from "../../components/Projects/SubProjectShowList/SubProjectShowList";
import { SubProjectList } from "../../components/Projects/SubProjectsList/SubProjectList";
import { DropListForItem } from "../../components/DropLists/DropLists/DropListForItem/DropListForItem";
import { projectType } from "../../types/types";

export const ProjectsPage = () => {
  const [editName, setEditName] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const dispatch = useAppDispatch();

  const {
    sortBy,
    order,
    projects,
    currentProjectIsShowSubProjects,
    currentEditProject,
    currentProjectIsShowTags,
    selectedProjects,
  } = useAppSelector((state) => state.projectsReducer);

  const handlerEditButton = (id: number) => {
    dispatch(projectsSlice.actions.setCurrentEditProjects(id));
    setEditName("");
  };
  const handlerAcceptButton = async (editName: string) => {
    await dispatch(setProjectName(editName));
    await updateData();
  };
  const handlerDeleteButton = async (id: number) => {
    await dispatch(deleteProject(id));
    updateData();
  };

  const setIsShowTags = (id: number) => {
    dispatch(projectsSlice.actions.setCurrentProjectIsShowTags(id));
    setFetching(false);
  };

  const setShowSubProject = (id: number) => {
    if (currentProjectIsShowSubProjects === id) {
      dispatch(projectsSlice.actions.setCurrentProjectIsShowSubProjects(0));
    } else if (currentProjectIsShowSubProjects !== id) {
      dispatch(projectsSlice.actions.setCurrentProjectIsShowSubProjects(id));
    }
    setFetching(false);
  };

  const handlerGetTagsByProject = async (id: number, isShowTags: boolean) => {
    setFetching(true);

    if (isShowTags) {
      setIsShowTags(0);
    } else if (!isShowTags) {
      setTags(
        await dispatch(selectTagsWitchCheked(searchProjectName, id, "project"))
      );
      setIsShowTags(id);
    }
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
      await dispatch(selectTagsWitchCheked(searchProjectName, id, "project"))
    );
    setFetching(false);
  };

  const handlerSetSearchProjectName = async (value: string) => {
    setSearchProjectName(value);
  };

  const updateData = async () => {
    await dispatch(getProjects());
    await dispatch(getTags());
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectsToMap: projectType[] =
    selectedProjects === null ? projects : selectedProjects;

  return (
    <div className={Style.container}>
      <ProjectsTable
        isFetching={isFetching}
        setFetching={setFetching}
        sortBy={sortBy}
        order={order}
        setSearchProjectName={handlerSetSearchProjectName}
        currentSearchProject={searchProjectName}
      />
      <ProjectCreateForm updateData={updateData} />
      <div className={Style.projectsContainer}>
        <div className={Style.projects}>
          {projectsToMap.map((project) => {
            const isEdit: boolean = project.id === currentEditProject;
            const isShowSubProjects: boolean =
              project.id === currentProjectIsShowSubProjects;
            return (
              <div className={isFetching ? Style.isFetching : ""}>
                <ProjectItem
                  handlerEditButton={handlerEditButton}
                  setEditName={setEditName}
                  handlerAcceptButton={handlerAcceptButton}
                  handlerDeleteButton={handlerDeleteButton}
                  editName={editName}
                  sumTime={project.sumTime}
                  status={project.status}
                  projectId={project.id}
                  projectName={project.projectName}
                  isEdit={isEdit}
                  key={project.id}
                  tags={
                    <DropListForItem
                      setSelect={handlerSetTag}
                      searchName={searchProjectName}
                      setSearchName={handlerSetSearchProjectName}
                      isShow={
                        project.id === currentProjectIsShowTags ? true : false
                      }
                      handlerGetData={handlerGetTagsByProject}
                      dataType="tags"
                      dataId={project.id}
                      data={tags}
                    />
                  }
                  subProjects={
                    <SubProjectShowList
                      isShowSubProjects={isShowSubProjects}
                      setShowSubProject={setShowSubProject}
                      projectId={project.id}
                      isFetching={isFetching}
                    />
                  }
                />
                <div className={Style.projectList}>
                  <SubProjectList
                    updateData={updateData}
                    isShowSubProjects={isShowSubProjects}
                    isFetching={isFetching}
                    setFetching={setFetching}
                    projectId={project.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
