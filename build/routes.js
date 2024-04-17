"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/welcome", (req, res, next) => {
    res.send("Welcome To Worship Grid!");
});
router.get("/status", (req, res, next) => {
    res.send("The app is running on Port 5000");
});
exports.default = router;
