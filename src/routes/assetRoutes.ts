import { Router } from "express";
import {
  createUserAsset,
  deleteUserAsset,
  getAllUserAssets,
  updateUserAsset
} from "../controllers/assetDataControl";

const router = Router();

router.get("/", getAllUserAssets);

router.post("/create_new_asset", createUserAsset);

router.put("/:asset_id/edit", updateUserAsset);

router.delete("/:asset_id", deleteUserAsset);

export default router;
