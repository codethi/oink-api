import { Router } from "express";
const route = Router();

import {
  create,
  findAll,
  update,
  erase,
  like,
  comment
} from "../controllers/post.controller.js";

import { authMiddleware } from "../middlewares/auth.middlewares.js";

route.post("/", authMiddleware, create);
route.get("/", authMiddleware, findAll);
route.patch("/:id", authMiddleware, update);
route.delete("/:id", authMiddleware, erase);
route.patch("/like/:id", authMiddleware, like);
route.patch("/comment/:id", authMiddleware, comment);

export default route;
