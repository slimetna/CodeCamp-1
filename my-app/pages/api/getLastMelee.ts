import { api } from "./api";
export const GetLastMelee = async (id: any) => {
  return await api.get(`/lastMelee/${id}`);
};
