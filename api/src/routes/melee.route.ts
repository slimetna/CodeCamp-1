import { Router } from "express";
const route: any = Router();

import {
  getAllMelee,
  getMelee,
  createMelee,
  deleteMelee,
  updateMelee,
  updateDetailsMelee
} from "../controllers/melee.controller";

route.get("/", async (req: any, res: any) => {
  await getAllMelee(req, res);
});

route.get("/:id", async (req: any, res: any) => {
  await getMelee(req, res);
});

route.post("/", async (req: any, res: any) => {
  await createMelee(req, res);
});

route.delete("/:id", async (req: any, res: any) => {
  await deleteMelee(req, res);
});

route.patch("/:id", async (req: any, res: any) => {
  await updateMelee(req, res);
});

route.patch("/:id/details", async (req: any, res: any) => {
  await updateDetailsMelee(req, res);
});

export default route;
