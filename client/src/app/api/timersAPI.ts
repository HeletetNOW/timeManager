import { AxiosResponse } from "axios";
import instance from "../instances";

export const timersAPI = {
  async getTimers(date?: number): Promise<AxiosResponse> {
    return instance.post(`/timers`, { date });
  },
  async createTimer(
    timerName: string,
    tags?: number[],
    date?: number
  ): Promise<AxiosResponse> {
    return instance.post("/timers/add", { timerName, tags, date });
  },
  async deleteTimer(id: number): Promise<AxiosResponse> {
    return instance.delete(`/timers/delete/${id}`);
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
  async addSubProjectToTimer(subProjectId: number, id: number) {
    return instance.post("/timers/add/subproject", { subProjectId, id });
  },
  async removeSubProjectFromTimer(subProjectId: number, id: number) {
    return instance.post("/timers/remove/subproject", { subProjectId, id });
  },

  async setTimerName(id: number, timerName: string) {
    return instance.post("/timers/set/name", { id, timerName });
  },
  async setTimerSum(id: number, sumTime: number) {
    return instance.post("/timers/set/sum", { id, sumTime });
  },
};
