"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserResponse = exports.updateUserResponse = exports.getOneUserResponse = exports.createUserReply = exports.getAllUserResponse = void 0;
const auth_1 = require("../authServices/auth");
const userResponse_1 = require("../models/userResponse");
const getAllUserResponse = async (req, res, next) => {
    let user_id = req.params.user_id;
    let userResponseFound = await userResponse_1.UserResponse.findByPk(user_id, {
        attributes: { exclude: ["password"] },
        include: [{ all: true, nested: true }]
    });
    if (userResponseFound) {
        const serializedUser = userResponseFound.toJSON();
        res.status(200).json(serializedUser);
    }
    else {
        res.status(404).json({});
    }
};
exports.getAllUserResponse = getAllUserResponse;
const createUserReply = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send("Unauthorized");
    }
    let newUserReply = req.body;
    newUserReply.user_id = user.user_id;
    if (newUserReply.reply || newUserReply.reactions) {
        let created = await userResponse_1.UserResponse.create(newUserReply);
        res.status(201).json(created);
    }
    else {
        res.status(400).send("Bad Request");
    }
};
exports.createUserReply = createUserReply;
const getOneUserResponse = async (req, res, next) => {
    let response_id = req.params.response_id;
    let userReplyFound = await userResponse_1.UserResponse.findByPk(response_id);
    if (userReplyFound) {
        res.status(200).json(userReplyFound);
    }
    else {
        res.status(404).json({});
    }
};
exports.getOneUserResponse = getOneUserResponse;
const updateUserResponse = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let response_id = req.params.response_id;
        let updatedResponse = req.body;
        if (!updatedResponse) {
            res.status(400).json("QAK Reply should not be empty");
        }
        updatedResponse.user_id = user.user_id;
        let responseFound = await userResponse_1.UserResponse.findByPk(response_id);
        if (responseFound) {
            if (responseFound.user_id == user.user_id) {
                await userResponse_1.UserResponse.update(updatedResponse, {
                    where: { response_id: response_id }
                });
                res.status(200).json(updatedResponse);
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
exports.updateUserResponse = updateUserResponse;
const deleteUserResponse = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let response_id = req.params.response_id;
        let replyFound = await userResponse_1.UserResponse.findByPk(response_id);
        if (replyFound) {
            if (replyFound.user_id == user.user_id) {
                await replyFound.destroy();
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
exports.deleteUserResponse = deleteUserResponse;
