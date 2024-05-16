import Style from "./ProjectsPage.module.css";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  getTags,
  selectTagsWitchCheked,
} from "../../store/tags/ActionCreators";
import {
  getProjects,
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
import { Loader } from "../../components/Loader/Loader";

export const ProjectsPage = () => {
  const [isVisibleLoader, setVisibleLoader] = useState(true);

  const [editName, setEditName] = useState("");
  const [editText, setEditText] = useState("");

  const [searchTagName, setSearchTagName] = useState("");
  const [searchProjectName, setSearchProjectName] = useState("");
  const [tags, setTags] = useState([]);
  const [isFetchingLocal, setFetchingLocal] = useState(false);

  const dispatch = useAppDispatch();
  const {
    sortBy,
    order,
    projects,
    currentProjectIsShowSubProjects,
    currentEditProject,
    currentProjectIsShowTags,
    selectedProjects,
    currentEditSubProject,
    isFetching,
  } = useAppSelector((state) => state.projectsReducer);

  const setIsShowTags = (id: number) => {
    dispatch(projectsSlice.actions.setCurrentProjectIsShowTags(id));
    setFetchingLocal(false);
  };

  const setShowSubProject = (id: number) => {
    if (currentProjectIsShowSubProjects === id) {
      dispatch(projectsSlice.actions.setCurrentProjectIsShowSubProjects(0));
    } else if (currentProjectIsShowSubProjects !== id) {
      dispatch(projectsSlice.actions.setCurrentProjectIsShowSubProjects(id));
    }
    setFetchingLocal(false);
  };

  const handlerGetTagsByProject = async (id: number, isShowTags: boolean) => {
    setFetchingLocal(true);

    if (isShowTags) {
      setIsShowTags(0);
    } else if (!isShowTags) {
      setTags(
        await dispatch(selectTagsWitchCheked(searchTagName, id, "project"))
      );
      setIsShowTags(id);
    }
  };

  const handlerSetTag = async (
    id: number,
    tagId: number,
    isChecked: boolean
  ) => {
    setFetchingLocal(true);

    const action = isChecked ? "delete" : "add";

    await dispatch(setTagToProject(id, tagId, action));

    await dispatch(getTags());
    await dispatch(getProjects());

    setTags(
      await dispatch(selectTagsWitchCheked(searchTagName, id, "project"))
    );
    setFetchingLocal(false);
  };

  const handlerSetSearchTagName = async (value: string, tagId: number) => {
    setSearchTagName(value);
    setTags(await dispatch(selectTagsWitchCheked(value, tagId, "project")));
  };

  const handlerSetSearchProjectName = async (value: string) => {
    setSearchProjectName(value);
  };

  const updateData = async () => {
    await dispatch(getProjects());
    await dispatch(getTags());

    await handlerGetTagsByProject(currentProjectIsShowTags, false);
  };

  let projectsToMap: projectType[] =
    searchProjectName === "" ? projects : selectedProjects;

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisibleLoader ? (
    <Loader
      isFetching={isFetching}
      setVisible={setVisibleLoader}
      isVisible={isVisibleLoader}
    />
  ) : (
    <div className={Style.container}>
      <ProjectsTable
        isFetching={isFetchingLocal}
        setFetching={setFetchingLocal}
        sortBy={sortBy}
        order={order}
        setSearchProjectName={handlerSetSearchProjectName}
        currentSearchProject={searchProjectName}
      />
      <div className={Style.all}>
        <ProjectCreateForm updateData={updateData} />
        <div className={Style.projectsContainer}>
          <div className={Style.projects}>
            {projectsToMap.map((project) => {
              const isEdit: boolean = project.id === currentEditProject;
              const isShowSubProjects: boolean =
                project.id === currentProjectIsShowSubProjects;
              return (
                <div className={isFetchingLocal ? Style.isFetching : ""}>
                  <ProjectItem
                    editText={editText}
                    setEditText={setEditText}
                    updateData={updateData}
                    setEditName={setEditName}
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
                        searchName={searchTagName}
                        setSearchName={handlerSetSearchTagName}
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
                        isFetching={isFetchingLocal}
                      />
                    }
                  />
                  <div className={Style.projectList}>
                    <SubProjectList
                      currentEditSubProject={currentEditSubProject}
                      updateData={updateData}
                      isShowSubProjects={isShowSubProjects}
                      isFetching={isFetchingLocal}
                      setFetching={setFetchingLocal}
                      projectId={project.id}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
