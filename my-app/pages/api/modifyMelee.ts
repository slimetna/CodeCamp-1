import { api } from "./api";

export const ModifyMelee = async (id: any, commentory: any, tags: any) => {
  const tagsArray: String[] = tags.split(",");
  const Modif = {
    commentory: commentory,
    tags: JSON.stringify(tagsArray),
  };
  console.log(Modif.tags);
  alert(Modif.tags);
  return await api.patch(`/melee/${id.toString()}/details`, Modif);
};
