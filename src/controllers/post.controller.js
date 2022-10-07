import { postSchema } from "../models/Post.js";
import {
  createService,
  findAllService,
  updateService,
  findByIdService,
  deleteService,
  likesService,
  likesDeleteService,
  commentsService,
  deleteCommentService,
  findPostsByUserIdService
} from "../services/post.service.js";

import { findById } from "../services/user.service.js";

export const create = async (req, res) => {
  try {
    const { text, image } = req.body;
    const userId = req.userId;

    const newPost = {
      image,
      text,
      user: userId,
      likes: [],
      comments: [],
      createdAt: new Date().toLocaleString("pt-Br"),
    };

    const validation = postSchema.validate(newPost, { abortEarly: false });
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      res.status(422).send({ errors });
      return;
    }

    await createService(newPost);

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

    res.send({
      result: posts.map((post) => {
        return {
          id: post._id,
          text: post.text,
          image: post.image,
          likes: post.likes,
          comments: post.comments.reverse(),
          createdAt: post.createdAt,
          userName: post.user.name,
          userAvatar: post.user.avatar,
          userEmail: post.user.email,
          userId: post.user._id,
          loggedUser: req.userId,
        };
      }),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const update = async (req, res) => {
  try {
    let { text, image } = req.body;
    const userId = req.userId;
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
    const userId = req.userId;
    const { id } = req.params;

    const post = await findByIdService(id);

    if (!post) {
      return res.status(400).send({ message: "This post does not exist" });
    }

    if (String(post.user) !== String(userId)) {
      return res.status(400).send({ message: "You can't delete this post" });
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
    const userId = req.userId;

    const postLiked = await likesService(id, userId);

    if (postLiked.modifiedCount === 0) {
      await likesDeleteService(id, userId);
      return res.status(200).send(false);
    }

    return res.status(200).send(true);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const comment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const userId = req.userId;

    if (!message) {
      return res.status(400).send({ message: "Write a message to comment" });
    }

    const user = await findById(userId);

    await commentsService(id, message, user);

    return res.send({
      message: "Comment successfully completed!",
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { idPost, idComment } = req.params;
    const userId = req.userId;

    const user = await findById(userId);

    const result = await deleteCommentService(idPost, user, idComment);

    if (result.modifiedCount === 0) {
      return res
        .status(200)
        .send({ message: "This comment has already been removed" });
    }

    return res.send({ message: "Comment successfully removed" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findPostsByUserId = async (req, res) => {
  try {
    const id = req.userId;

    const posts = await findPostsByUserIdService(id);

    return res.send({
      result: posts.map((post) => {
        return {
          id: post._id,
          text: post.text,
          image: post.image,
          likes: post.likes,
          comments: post.comments.reverse(),
          createdAt: post.createdAt,
          userName: post.user.name,
          userAvatar: post.user.avatar,
          userEmail: post.user.email,
          userId: post.user._id,
          loggedUser: req.userId,
        };
      }),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
