import { api } from "./api";

export const ReserveMelee = async (id: any, user: any) => {
  const User = {
    user: user,
  };
  return await api.patch(`/melee/${id}`, User);
};
