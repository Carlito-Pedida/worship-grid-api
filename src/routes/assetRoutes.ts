import { Router } from "express";
import {
  createUserAsset,
  deleteUserAsset,
  getAllUserAssets,
  getOneUserAsset,
  updateUserAsset
} from "../controllers/assetDataControl";

const router = Router();

router.get("/", getAllUserAssets);

router.post("/create_new_asset", createUserAsset);

router.get("/asset/:asset_id", getOneUserAsset);

router.put("/asset/:asset_id", updateUserAsset);

router.delete("/:asset_id", deleteUserAsset);

export default router;
