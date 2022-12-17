import { api } from "./api";

export const FetchPromo = async () => {
  return await api.get("/trombi/");
};
