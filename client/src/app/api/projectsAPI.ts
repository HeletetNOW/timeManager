import { AxiosResponse } from "axios";
import instance from "../instances";

export const projectsAPI = {
  async getProjects(
    tagId?: { id: number }[],
    projectName?: string,
    order?: string,
    id?: number,
    sortBy?: string
  ): Promise<AxiosResponse> {
    return instance.post("/projects", {
      sortBy,
      id,
      order,
      projectName,
      tagId,
    });
  },
  async getSubProjects(timerId?: number) {
    return instance.get(`/projects/get/subprojects/${timerId}`);
  },
  async createProject(
    projectName: string,
    tags?: { id: number }[]
  ): Promise<AxiosResponse> {
    return instance.post("/projects/create", {
      projectName,
      tags,
    });
  },
  async addTagToProject(tagId: number, id: number): Promise<AxiosResponse> {
    return instance.post("/projects/add/tags", { tagId, id });
  },
  async removeTagToProject(tagId: number, id: number): Promise<AxiosResponse> {
    return instance.post("/projects/remove/tag", { tagId, id });
  },
  async setProjectName(
    projectName: string,
    id: number
  ): Promise<AxiosResponse> {
    return instance.post("/projects/set/name", { projectName, id });
  },
  async deleteProject(id: number): Promise<AxiosResponse> {
    return instance.delete(`/projects/delete/${id}`);
  },
  async createSubProject(
    subProjectName: string,
    projectId: number,
    description?: string
  ): Promise<AxiosResponse> {
    return instance.post("/projects/add/subproject", {
      subProjectName,
      projectId,
      description,
    });
  },
  async removeSubProject(subProjectId: number): Promise<AxiosResponse> {
    return instance.delete(`/projects/remove/subproject/${subProjectId}`);
  },
  async setSubProjectStatus(
    status: boolean,
    id: number
  ): Promise<AxiosResponse> {
    return instance.post(`/projects/set/substatus`, { status, id });
  },
};
