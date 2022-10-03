import joi from "joi";

export const postSchema = joi.object({
  text: joi.string().min(1).required(),
  image: joi.string().min(1).required(),
  user: joi.string().min(1).required(),
  likes: joi.array(),
  comments: joi.array(),
});
