import jwt from "jsonwebtoken";
import { db } from "../database/db.js";

import dotenv from "dotenv";
import { ObjectId } from "mongodb";
dotenv.config();

export const singupSevice = (body) => db.collection("users").insertOne(body);
export const singinSevice = (email) =>
  db.collection("users").findOne({ email: email });
export const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.SECRET, { expiresIn: 86400 });

export const findById = (id) =>
  db.collection("users").findOne({ _id: ObjectId(id) });
