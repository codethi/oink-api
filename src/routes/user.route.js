import { Route } from "express";
const route = Route();

import {singin} from '../controllers/user.controller.js'

route.post("/singup", singup);
route.post("/singin", singin);

export default route;
