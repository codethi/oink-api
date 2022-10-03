import { Route } from "express";
const route = Route();

route.post("/", create);
route.get("/", findAll);
route.patch('/', update)
route.delete('/', erase)

export default route;
