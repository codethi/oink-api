import { ObjectId } from "mongodb";
import { db } from "../database/db.js";

const postCollection = db.collection("posts");

export const createService = (body) => postCollection.insertOne(body);

export const findAllService = () =>
  postCollection
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ])
    .sort({ _id: -1 })
    .toArray();

export const findByIdService = (id) =>
  postCollection.findOne({ _id: ObjectId(id) });

export const updateService = ({ postId, image, text }) =>
  postCollection.updateOne({ _id: postId }, { $set: { image, text } });

export const deleteService = (id) =>
  postCollection.deleteOne({ _id: ObjectId(id) });

export const likesService = (id, userId) =>
  postCollection.updateOne(
    {
      _id: ObjectId(id),
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date().toLocaleString("pt-Br") },
      },
    },
    {
      rawResult: true,
    }
  );

export const likesDeleteService = (id, userId) =>
  postCollection.updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );

export const commentsService = (id, message, user) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return postCollection.updateOne(
    {
      _id: ObjectId(id),
    },
    {
      $push: {
        comments: { idComment, user, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
};

export const deleteCommentService = (idPost, user, idComment) =>
  postCollection.updateOne(
    {
      _id: ObjectId(idPost),
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          user: user,
        },
      },
    }
  );

export const findPostsByUserIdService = (id) =>
  postCollection
    .aggregate([
      {
        $match: {
          user: id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
    ])
    .sort({ _id: -1 })
    .toArray();
