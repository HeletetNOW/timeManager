import Style from "./ProjectList.module.css";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getTagsByProjectIdSelected } from "../../store/tags/ActionCreators";
import {
  deleteProject,
  getProjects,
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

export const ProjectList = () => {
  const [editName, setEditName] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");
  const [data, setData] = useState([]);
  const [isFetching, setFetching] = useState(false);

  const dispatch = useAppDispatch();

  const {
    sortBy,
    order,
    projects,
    currentProjectIsShowSubProjects,
    currentEditProject,
    currentSearchProject,
    currentProjectIsShowTags,
  } = useAppSelector((state) => state.projectsReducer);

  const handlerEditButton = (id: number) => {
    dispatch(projectsSlice.actions.setCurrentEditProjects(id));
    setEditName("");
  };
  const handlerAcceptButton = (editName: string) => {
    dispatch(setProjectName(editName));
  };
  const handlerDeleteButton = (id: number) => {
    dispatch(deleteProject(id));
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
    if (isShowTags) {
      setIsShowTags(0);
    } else if (!isShowTags) {
      setFetching(true);
      setData(
        await dispatch(getTagsByProjectIdSelected(id, searchProjectName))
      );
      setIsShowTags(id);
    }
  };

  const handlerSetTag = async (
    id: number,
    tagId: number,
    isChecked: boolean
  ) => {
    const action = isChecked ? "delete" : "add";

    dispatch(setTagToProject(id, tagId, action));
    setData(await dispatch(getTagsByProjectIdSelected(id, searchProjectName)));
  };

  const handlerSetSearchProjectName = async (value: string, id: number) => {
    setSearchProjectName(value);
    setData(await dispatch(getTagsByProjectIdSelected(id, value)));
  };

  useEffect(() => {
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={Style.container}>
      <ProjectsTable
        sortBy={sortBy}
        order={order}
        currentSearchProject={currentSearchProject}
      />
      <ProjectCreateForm />
      <div className={Style.projectsContainer}>
        <div className={Style.projects}>
          {projects.map((project) => {
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
                      data={data}
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
