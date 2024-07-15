"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserAsset = exports.updateUserAsset = exports.getOneUserAsset = exports.createUserAsset = exports.getAllUserAssets = void 0;
const userAssets_1 = require("../models/userAssets");
const auth_1 = require("../authServices/auth");
const getAllUserAssets = async (req, res, next) => {
    let userAsset = await userAssets_1.UserAssets.findAll({
        attributes: { exclude: ["password"] },
        include: [{ all: true, nested: true }]
    });
    res.status(200).json(userAsset);
};
exports.getAllUserAssets = getAllUserAssets;
const createUserAsset = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send("Unauthorized");
    }
    let newAsset = req.body;
    newAsset.user_id = user.user_id;
    if (newAsset.message || newAsset.imageLink || newAsset.videoLink) {
        let created = await userAssets_1.UserAssets.create(newAsset);
        res.status(201).json(created);
    }
    else {
        res.status(400).send("Bad Request");
    }
};
exports.createUserAsset = createUserAsset;
const getOneUserAsset = async (req, res, next) => {
    let asset_id = req.params.asset_id;
    let foundAsset = await userAssets_1.UserAssets.findByPk(asset_id);
    if (foundAsset) {
        res.status(200).json(foundAsset);
    }
    else {
        res.status(404).json({});
    }
};
exports.getOneUserAsset = getOneUserAsset;
const updateUserAsset = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let asset_id = req.params.asset_id;
        let updatedAsset = req.body;
        updatedAsset.user_id = user.user_id;
        let assetFound = await userAssets_1.UserAssets.findByPk(asset_id);
        if (assetFound) {
            if (assetFound.user_id == user.user_id) {
                await userAssets_1.UserAssets.update(updatedAsset, {
                    where: { asset_id: asset_id }
                });
                res.status(200).json(updatedAsset);
            }
            else {
                res.status(403).json("Not Authorized");
            }
        }
        else {
            res.status(404).json("Not found");
        }
    }
    else {
        res.status(401).json("Not Logged in");
    }
};
exports.updateUserAsset = updateUserAsset;
const deleteUserAsset = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let asset_id = req.params.asset_id;
        let assetFound = await userAssets_1.UserAssets.findByPk(asset_id);
        if (assetFound) {
            if (assetFound.user_id == user.user_id) {
                await assetFound.destroy();
                res.status(200).json("Post Deleted");
            }
            else {
                res.status(403).json("Not Authorized");
            }
        }
        else {
            res.status(404).json("Not found");
        }
    }
    else {
        res.status(401).json("Not Logged in");
    }
};
exports.deleteUserAsset = deleteUserAsset;
//# sourceMappingURL=assetDataControl.js.map