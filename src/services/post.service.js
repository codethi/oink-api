import { db } from "../database/db.js";

export const createService = (body) => db.collection("posts").insertOne(body);



