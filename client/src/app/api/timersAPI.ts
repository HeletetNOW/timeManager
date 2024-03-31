import { AxiosResponse } from "axios";
import instance from "../instances";

export const timersAPI = {
  async getTimers(date?: number): Promise<AxiosResponse> {
    return instance.post(`/timers`, { date });
  },
  async createTimer(
    timerName: string,
    projects?: { id: number }[],
    tags?: { id: number }[]
  ): Promise<AxiosResponse> {
    return instance.post("/timers/add", { timerName, projects, tags });
  },
  async startTimer(id: number): Promise<AxiosResponse> {
    return instance.post(`/timers/control/start/${id}`);
  },
  async stopTimer(id: number): Promise<AxiosResponse> {
    return instance.post(`/timers/control/end/${id}`);
  },
  async addTagToTimer(tagId: number, id: number) {
    return instance.post("/timers/add/tag", { tagId, id });
  },
  async removeTagFromTimer(tagId: number, id: number) {
    return instance.post("/timers/remove/tag", { tagId, id });
  },
  async addProjectToTimer(projectId: number, id: number) {
    return instance.post("/timers/add/project", { projectId, id });
  },
  async removeProjectFromTimer(projectId: number, id: number) {
    return instance.post("/timers/remove/project", { projectId, id });
  },
};
