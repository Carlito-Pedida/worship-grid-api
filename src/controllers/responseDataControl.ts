import { RequestHandler } from "express";
import { UserData } from "../models/userData";
import { verifyUser } from "../authServices/auth";
import { UserResponse } from "../models/userResponse";

export const getAllUserResponse: RequestHandler = async (req, res, next) => {
  let user_id = req.params.user_id;
  let userResponseFound = await UserResponse.findByPk(user_id, {
    attributes: { exclude: ["password"] },
    include: [{ all: true, nested: true }]
  });
  if (userResponseFound) {
    const serializedUser = userResponseFound.toJSON();
    res.status(200).json(serializedUser);
  } else {
    res.status(404).json({});
  }
};

export const createUserReply: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send("Unauthorized");
  }

  let newUserReply: UserResponse = req.body;
  newUserReply.user_id = user.user_id;

  if (newUserReply.reply) {
    let created = await UserResponse.create(newUserReply);
    res.status(201).json(created);
  } else {
    res.status(400).send("Bad Request");
  }
};

export const getOneUserReply: RequestHandler = async (req, res, next) => {
  let response_id = req.params.response_id;
  let userReplyFound = await UserResponse.findByPk(response_id);
  if (userReplyFound) {
    res.status(200).json(userReplyFound);
  } else {
    res.status(404).json({});
  }
};
