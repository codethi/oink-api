import { Router } from "express";
const route = Router();

import {
  singin,
  singup,
  findByIdUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

route.post("/singup", singup);
route.post("/singin", singin);
route.get("/findById/:id?", authMiddleware, findByIdUser);

export default route;
