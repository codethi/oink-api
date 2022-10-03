import bcrypt from "bcrypt";
import {
  singupSevice,
  singinSevice,
  generateToken,
} from "../services/user.service.js";

import { userSchema } from "../models/User.js";

export const singup = async (req, res) => {
  try {
    let { name, email, password, avatar } = req.body;

    if (!name || !email || !password || !avatar) {
      return res.status(400).send({
        message: "Submit all fields for registration",
      });
    }

    const validation = userSchema.validate(
      { name, email, password, avatar },
      { abortEarly: false }
    );
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      res.status(422).send(errors);
      return;
    }

    password = await bcrypt.hash(password, 10);

    const user = await singupSevice({ name, email, password, avatar });

    if (!user) {
      return res.status(400).send({
        message: "Error creating User",
      });
    }

    res.status(201).send({
      message: "User created",
      user: {
        id: user.id,
        name,
        email,
        avatar,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const singin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await singinSevice(email);

    if (!user) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(404).send({ message: "User or Password not found" });
    }

    const token = generateToken(user.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
