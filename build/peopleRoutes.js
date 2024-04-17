"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/jej", (req, res, next) => {
    res.send("Welcome To Worship Grid Jej!");
});
router.get("/john", (req, res, next) => {
    res.send("Welcome To Worship Grid John!");
});
exports.default = router;
