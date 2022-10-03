import { Router } from "express";
const route = Router();

import { singin, singup } from "../controllers/user.controller.js";

route.post("/singup", singup);
route.post("/singin", singin);

export default route;
