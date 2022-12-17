import { api } from "./api";

export const Auth = async (auth: any) => {
  return await api.post("/auth", auth);
};
