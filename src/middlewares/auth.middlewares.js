import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findById } from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.send(401);
    }

    const parts = authorization.split(" ");

    if (parts.length !== 2) {
      return res.send(401);
    }

    const [schema, token] = parts;

    if (schema !== "Bearer") {
      return res.send(401);
    }

    jwt.verify(token, process.env.SECRET, async (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .send({ message: `Token invalid, Error: ${error.message}` });
      }

      const user = await findById(decoded.id);

      if (!user || !user._id) {
        return res
          .status(401)
          .send({ message: `Token invalid` });
      }

      req.userId = user._id;

      return next();
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
