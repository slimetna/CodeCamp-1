import { api } from "./api";

export const DeleteMelee = async (id: any) => {
  return await api.delete(`/melee/${id}`);
};
