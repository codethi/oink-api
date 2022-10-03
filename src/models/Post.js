import joi from "joi";

export const postSchema = joi.object({
  text: joi.string().min(1).required(),
  image: joi.string().min(1),
  user: joi.string().required(),
  likes: joi.array(),
  comments: joi.array(),
});
