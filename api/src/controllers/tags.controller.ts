import tagModel from "../db/models/tags.model";
import { getStudentByIdCache } from "./users.controller";

export async function createTag(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  let data: any = req.body;

  if (!data.name) {
    res.send({ status: 400, message: "Missing data" });
    return;
  }

  let d: Date = new Date();
  d.setTime(d.getTime() - new Date().getTimezoneOffset() * 60 * 1000);

  let response: any = await tagModel.create({
    id: data.name
      .toLowerCase()
      .replaceAll(" ", "_")
      .replaceAll(/(?:\r\n|\r|\n)/g, ""),
    name: data.name,
    createdAt: d,
    updatedAt: d,
  });
  res.send({ status: 200, message: "Tag created", data: response });
}

export async function getTag(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  if (req.params.id) {
    const tag = await tagModel.findOne({ id: req.params.id });
    if (tag) {
      return res.send(tag);
    }
    return res.send({
      code: 404,
      error: "No tag found",
    });
  }

  const tags = await tagModel.find({});
  if (tags && tags.length > 0) {
    return res.send(tags);
  }
  return res.send({
    code: 404,
    error: "No tags found",
  });
}

export async function deleteTag(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  if (req.params.id) {
    const tag = await tagModel.findOneAndDelete({ id: req.params.id });
    if (tag) {
      return res.send(tag);
    }
    return res.send({
      code: 404,
      error: "This tag doesn't exist",
    });
  }

  return res.send({
    code: 400,
    error: "No id specified",
  });
}

export async function addUserToTag(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  let { login } = req.body || { login: null };
  let id = req.params.id;
  if (!id || !login) return res.send({ code: 404, error: "Missing data" });

  let tag = await tagModel.findOne({ id: id });
  if (!tag) return res.send({ code: 404, error: "Tag not found" });

  let student: any = await getStudentByIdCache(req, res);

  let users = tag.users;
  tag.users = [...users, student];

  await tag.save();
  return res.send({ code: 200, message: "User added to tag" });
}

export async function delUserToTag(req: any, res: any) {
  const { authenticator } = req.cookies || { authenticator: null };
  if (!authenticator) {
    res.send({ status: 400, message: "Wrong Token" });
    return;
  }

  let { login } = req.body || { login: null };
  let id = req.params.id;
  if (!id || !login) return res.send({ code: 404, error: "Missing data" });

  let tag = await tagModel.findOne({ id: id });
  if (!tag) return res.send({ code: 404, error: "Tag not found" });

  let users = tag.users;
  tag.users = users.filter((e: any) => e.login !== login);

  await tag.save();
  return res.send({ code: 200, message: "User has been removed from the tag" });
}

