import joi from "joi";

export const postSchema = joi.object({
  text: joi.string().min(1).required(),
  image: joi.string().min(0),
  user: joi.required(),
  likes: joi.array(),
  comments: joi.array(),
  createdAt: joi.string().required(),
});
