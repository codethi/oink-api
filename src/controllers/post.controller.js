import { postSchema } from "../models/Post.js";
import { createService } from "../services/post.service.js";

export const create = async (req, res) => {
  try {
    const { text, image } = req.body;
    const userId = req.userId.toString();

    const validation = postSchema.validate(
      {
        text,
        image,
        user: userId,
      },
      { abortEarly: false }
    );
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      res.status(422).send(errors);
      return;
    }

    await createService({image, text, userId});

    return res.send({
      message: "Post created successfully!",
      post: { text, image },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const findAll = async (req, res) => {};
export const update = async (req, res) => {};
export const erase = async (req, res) => {};
export const like = async (req, res) => {};
export const comment = async (req, res) => {};
