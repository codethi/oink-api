import { Router } from "express";
const route = Router();

import { singin, singup, findByIdUser } from "../controllers/user.controller.js";

route.post("/singup", singup);
route.post("/singin", singin);
route.get("/:id", findByIdUser);

export default route;
