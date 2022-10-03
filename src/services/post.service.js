import { db } from "../database/db.js";

export const createService = (body) => db.collection("posts").insertOne(body);

export const findAllService = () => db.collection("posts").find({}).toArray();
