import { api } from "./api";

export const GetAllMelee = async () => {
  return await api.get("/melee");
};
