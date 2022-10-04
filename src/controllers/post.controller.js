import { postSchema } from "../models/Post.js";
import {
  createService,
  findAllService,
  updateService,
  findByIdService,
  deleteService,
  likesService,
  likesDeleteService,
} from "../services/post.service.js";

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

    await createService({
      image,
      text,
      user: userId,
      likes: [],
      comments: [],
    });

    return res.send({
      message: "Post created successfully!",
      post: { text, image },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const posts = await findAllService();

    if (posts.length === 0) {
      return res.status(400).send({ message: "There are no posts" });
    }

    res.send(posts);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const update = async (req, res) => {
  try {
    let { text, image } = req.body;
    const userId = req.userId.toString();
    const { id } = req.params;

    const post = await findByIdService(id);

    if (!post) {
      return res.status(400).send({ message: "This post does not exist" });
    }

    if (post.user !== userId) {
      return res.status(400).send({ message: "You can't update this post" });
    }

    !text ? (text = post.text) : text;
    !image ? (image = post.image) : image;

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

    await updateService({ postId: post._id, image, text });

    return res.send({
      message: "Post updated successfully!",
      post: { text, image },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const erase = async (req, res) => {
  try {
    const userId = req.userId.toString();
    const { id } = req.params;

    const post = await findByIdService(id);

    if (!post) {
      return res.status(400).send({ message: "This post does not exist" });
    }

    if (post.user !== userId) {
      return res.status(400).send({ message: "You can't update this post" });
    }

    await deleteService(id);

    return res.send({
      message: "Post deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const like = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId.toString();

    const postLiked = await likesService(id, userId);

    if (postLiked.modifiedCount === 0) {
      await likesDeleteService(id, userId);
      return res.status(200).send({ message: "Like successfully removed" });
    }

    return res.send({
      message: "Like done successfully",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const comment = async (req, res) => {};
