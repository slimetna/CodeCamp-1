import { api } from "./api";

export const getAllTag = async () => {
  return await api.get("/tags");
};
