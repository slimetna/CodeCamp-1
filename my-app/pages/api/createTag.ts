import { api } from "./api";

export const createTag = async (name: any) => {
  return await api.post("/tags", name);
};
