"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserData = exports.updateUserData = exports.getUserAssets = exports.getOneUser = exports.signinUser = exports.signupUser = exports.getAllUserData = void 0;
const userData_1 = require("../models/userData");
const auth_1 = require("../authServices/auth");
const getAllUserData = async (req, res, next) => {
    let users = await userData_1.UserData.findAll({
        attributes: { exclude: ["password"] },
        include: [{ all: true, nested: true }]
    });
    res.status(200).json(users);
};
exports.getAllUserData = getAllUserData;
const signupUser = async (req, res, next) => {
    let newUser = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
        newUser.password = hashedPassword;
        let created = await userData_1.UserData.create(newUser);
        res.status(201).json({
            username: created.username,
            user_id: created.user_id
        });
    }
    else {
        res.status(400).send("Username and Password required");
    }
};
exports.signupUser = signupUser;
const signinUser = async (req, res, next) => {
    let existingUser = await userData_1.UserData.findOne({
        where: { username: req.body.username }
    });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json("Invalid password");
        }
    }
    else {
        res.status(401).json("Invalid username");
    }
};
exports.signinUser = signinUser;
const getOneUser = async (req, res, next) => {
    let user_id = req.params.user_id;
    let foundUser = await userData_1.UserData.findByPk(user_id, {
        include: [{ all: true, nested: true }]
    });
    if (foundUser) {
        res.status(200).json(foundUser);
    }
    else {
        res.status(404).json({});
    }
};
exports.getOneUser = getOneUser;
const getUserAssets = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let assets = await userData_1.UserData.findByPk(user.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ all: true, nested: true }]
        });
        res.status(200).json(assets);
    }
    else {
        res.status(404).json();
    }
};
exports.getUserAssets = getUserAssets;
const updateUserData = async (req, res, next) => {
    const user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let user_id = req.params.user_id;
        let updatedUser = req.body;
        if (updatedUser.username) {
            if (updatedUser.password) {
                let hashedPassword = await (0, auth_1.hashPassword)(updatedUser.password);
                updatedUser.password = hashedPassword;
            }
            updatedUser.user_id = user.user_id;
            let userFound = await userData_1.UserData.findByPk(user_id);
            if (userFound &&
                userFound.user_id == updatedUser.user_id &&
                updatedUser.username &&
                updatedUser.email &&
                updatedUser.first_name &&
                updatedUser.last_name &&
                updatedUser.city &&
                updatedUser.state &&
                updatedUser.zipcode &&
                updatedUser.position &&
                updatedUser.avatar) {
                await userData_1.UserData.update(updatedUser, {
                    where: { user_id: parseInt(user_id) }
                });
                res.status(200).json(updatedUser);
            }
            else {
                res.status(400).json({ error: "Invalid update data" });
            }
        }
        else {
            res.status(400).json({ error: "Username is required" });
        }
    }
    else {
        res.status(400).json({ error: "User not found" });
    }
};
exports.updateUserData = updateUserData;
const deleteUserData = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (user) {
        let user_id = req.params.user_id;
        let userFound = await userData_1.UserData.findByPk(user_id);
        if (userFound) {
            if (userFound.user_id == user.user_id) {
                await userFound.destroy();
                res.status(200).json("User Data Deleted");
            }
        }
        else {
            res.status(403).json("Not Authorized");
        }
    }
    else {
        res.status(401).json("Not Logged in");
    }
};
exports.deleteUserData = deleteUserData;
//# sourceMappingURL=userDataContol.js.map