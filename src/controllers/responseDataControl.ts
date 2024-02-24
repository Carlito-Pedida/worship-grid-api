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

  if (newUserReply.reply || newUserReply.reactions) {
    let created = await UserResponse.create(newUserReply);
    res.status(201).json(created);
  } else {
    res.status(400).send("Bad Request");
  }
};

export const getOneUserResponse: RequestHandler = async (req, res, next) => {
  let response_id = req.params.response_id;
  let userReplyFound = await UserResponse.findByPk(response_id);
  if (userReplyFound) {
    res.status(200).json(userReplyFound);
  } else {
    res.status(404).json({});
  }
};

export const updateUserResponse: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let response_id = req.params.response_id;
    let updatedResponse: UserResponse = req.body;

    if (!updatedResponse) {
      res.status(400).json("QAK Reply should not be empty");
    }

    updatedResponse.user_id = user.user_id;

    let responseFound = await UserResponse.findByPk(response_id);

    if (responseFound) {
      if (responseFound.user_id == user.user_id) {
        await UserResponse.update(updatedResponse, {
          where: { response_id: response_id }
        });
        res.status(200).json(updatedResponse);
      } else {
        res.status(403).json("Not Authorized");
      }
    } else {
      res.status(404).json("Not found");
    }
  } else {
    res.status(401).json("Not Logged in");
  }
};

export const deleteUserResponse: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let response_id = req.params.response_id;

    let replyFound = await UserResponse.findByPk(response_id);

    if (replyFound) {
      if (replyFound.user_id == user.user_id) {
        await replyFound.destroy();

        res.status(200).json("Post Deleted");
      } else {
        res.status(403).json("Not Authorized");
      }
    } else {
      res.status(404).json("Not found");
    }
  } else {
    res.status(401).json("Not Logged in");
  }
};
