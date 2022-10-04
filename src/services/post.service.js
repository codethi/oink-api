import { ObjectId } from "mongodb";
import { db } from "../database/db.js";

export const createService = (body) => db.collection("posts").insertOne(body);

export const findAllService = () => db.collection("posts").find({}).toArray();

export const findByIdService = (id) =>
  db.collection("posts").findOne({ _id: ObjectId(id) });

export const updateService = ({ postId, image, text }) =>
  db.collection("posts").updateOne({ _id: postId }, { $set: { image, text } });
