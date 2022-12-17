import { api } from "./api";

export const MeleeCreation = async (melee: any) => {
  return await api.post("/melee", melee);
};
