import { api } from "./api";

export const GetMeleeByID = async (id: any) => {
  return await api.get(`/melee/${id}`);
};
