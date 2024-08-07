"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assetDataControl_1 = require("../controllers/assetDataControl");
const router = (0, express_1.Router)();
router.get("/", assetDataControl_1.getAllUserAssets);
router.post("/create_new_asset", assetDataControl_1.createUserAsset);
router.get("/asset/:asset_id", assetDataControl_1.getOneUserAsset);
router.put("/asset/:asset_id", assetDataControl_1.updateUserAsset);
router.delete("/:asset_id", assetDataControl_1.deleteUserAsset);
exports.default = router;
//# sourceMappingURL=assetRoutes.js.map