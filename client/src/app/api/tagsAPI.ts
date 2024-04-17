import { AxiosResponse } from "axios";
import instance from "../instances";

export const tagsAPI = {
  async getTags(
    order?: string,
    tagName?: string,
    id?: number,
    projectId?: number,
    timerId?: number
  ): Promise<AxiosResponse> {
    return instance.post("/tags", { id, order, tagName, projectId, timerId });
  },
  async addTag(tagName: string, projects: number[]): Promise<AxiosResponse> {
    return instance.post("/tags/add", { tagName, projects });
  },
  async deleteTag(id: number): Promise<AxiosResponse> {
    return instance.delete(`/tags/delete/${id}`);
  },
  async setTagName(tagName: string, id: number): Promise<AxiosResponse> {
    return instance.post("/tags/set/name", { tagName, id });
  },
  async addProjectToTag(projectId: number, id: number): Promise<AxiosResponse> {
    return instance.post("/tags/add/projects", { projectId, id });
  },
  async removeProjectToTag(
    projectId: number,
    id: number
  ): Promise<AxiosResponse> {
    return instance.post("/tags/remove/projects", { projectId, id });
  },
};
