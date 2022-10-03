import joi from "joi";

export const userSchema = joi.object({
  name: joi.string().min(1).required(),
  avatar: joi.string().min(1).required(),
  email: joi.string().min(1).required(),
  password: joi.string().min(1).required(),
});
