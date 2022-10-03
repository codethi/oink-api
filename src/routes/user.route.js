import { Route } from "express";
const route = Route();

route.post("/singup", singup);
route.post("/singin", singin);

export default route;
