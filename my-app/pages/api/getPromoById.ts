import { api } from "./api";

export const GetPromoById = async (login: any) => {
  return await api.get(`/users/${login}`);
};
