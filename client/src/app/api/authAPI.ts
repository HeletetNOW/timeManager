import { AxiosResponse } from "axios";
import instance from "../instances";

export const authAPI = {
  async login(email: string, password: string): Promise<AxiosResponse> {
    return instance.post("/users/login", { email, password });
  },
  async register(
    name: string,
    surname: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return instance.post("/users/register", { name, surname, email, password });
  },
  async current(): Promise<AxiosResponse> {
    return instance.get("/users/current");
  },
  async logout(): Promise<AxiosResponse> {
    return instance.post("/users/logout");
  },
};
