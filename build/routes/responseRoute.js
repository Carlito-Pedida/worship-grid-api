"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const responseDataControl_1 = require("../controllers/responseDataControl");
const router = (0, express_1.Router)();
router.post("/", responseDataControl_1.createUserReply);
router.get("/:response_id", responseDataControl_1.getOneUserReply);
exports.default = router;
