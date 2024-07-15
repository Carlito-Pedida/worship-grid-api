"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userData_1 = require("../models/userData");
require("dotenv").config();
const secretCode = process.env.SECRET_CODE;
const hashPassword = async (plainTextPassword) => {
    const saltRound = 12;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
};
exports.comparePasswords = comparePasswords;
const signUserToken = async (user) => {
    let token = jsonwebtoken_1.default.sign({
        user_id: user.user_id,
        username: user.username,
        first_name: user.first_name,
        avatar: user.avatar
    }, secretCode, { expiresIn: "1hr" });
    return token;
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    // Get authorization header from the request
    const authHeader = req.headers.authorization;
    // if header exists, parse token from `Bearer <token>`
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // verify token and get the user
        try {
            let decoded = await jsonwebtoken_1.default.verify(token, secretCode);
            return userData_1.UserData.findByPk(decoded.user_id);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth.js.map