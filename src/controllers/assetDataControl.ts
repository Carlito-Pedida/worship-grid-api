import { RequestHandler } from "express";
import { UserAssets } from "../models/userAssets";
import { UserData } from "../models/userData";
import { verifyUser } from "../authServices/auth";

export const getAllUserAssets: RequestHandler = async (req, res, next) => {
  let userAsset = await UserAssets.findAll({
    attributes: { exclude: ["password"] },
    include: [{ all: true, nested: true }]
  });

  res.status(200).json(userAsset);
};

export const createUserAsset: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (!user) {
    return res.status(403).send("Unauthorized");
  }

  let newAsset: UserAssets = req.body;
  newAsset.user_id = user.user_id;

  if (newAsset.message || newAsset.imageLink || newAsset.videoLink) {
    let created = await UserAssets.create(newAsset);
    res.status(201).json(created);
  } else {
    res.status(400).send("Bad Request");
  }
};

export const getOneUserAsset: RequestHandler = async (req, res, next) => {
  let asset_id = req.params.asset_id;
  let foundAsset = await UserAssets.findByPk(asset_id);
  if (foundAsset) {
    res.status(200).json(foundAsset);
  } else {
    res.status(404).json({});
  }
};

export const updateUserAsset: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let asset_id = req.params.asset_id;
    let updatedAsset: UserAssets = req.body;

    updatedAsset.user_id = user.user_id;

    let assetFound = await UserAssets.findByPk(asset_id);

    if (assetFound) {
      if (assetFound.user_id == user.user_id) {
        await UserAssets.update(updatedAsset, {
          where: { asset_id: asset_id }
        });
        res.status(200).json(updatedAsset);
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

export const deleteUserAsset: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let asset_id = req.params.asset_id;

    let assetFound = await UserAssets.findByPk(asset_id);

    if (assetFound) {
      if (assetFound.user_id == user.user_id) {
        await assetFound.destroy();

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
