import { api } from "./api";

export const UserTag = async (id: any, login: any) => {
  const Login = {
    login: login,
  };
  return await api.post(`/tags/${id}/users`, Login);
};
