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

export const createAsset: RequestHandler = async (req, res, next) => {
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

export const deleteUserAsset: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let asset_id = req.params.asset_id;
    let assetFound = await UserAssets.findByPk(asset_id);

    if (assetFound) {
      if (assetFound.user_id == user.user_id) {
        await assetFound.destroy();
        res.status(200).json("Post Deleted");
      }
    } else {
      res.status(403).json("Not Authorized");
    }
  } else {
    res.status(401).json("Not Logged in");
  }
};

export const updateUserAsset: RequestHandler = async (req, res, next) => {
  let user: UserData | null = await verifyUser(req);

  if (user) {
    let asset_id = req.params.postId;
    let updatedAsset: UserAssets = req.body;

    updatedAsset.user_id = user.user_id;

    let assetFound = await UserAssets.findByPk(asset_id);

    assetFound &&
      assetFound.asset_id == updatedAsset.asset_id &&
      updatedAsset.message &&
      updatedAsset.imageLink &&
      updatedAsset.videoLink &&
      updatedAsset.user_id;
    {
      await UserAssets.update(updatedAsset, {
        where: { asset_id: parseInt(asset_id) }
      }).then;
    }
    res.status(200).json(updatedAsset);
  } else {
    res.status(400).json();
  }
};
