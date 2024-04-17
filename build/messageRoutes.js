"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = require("./messages");
const router = (0, express_1.Router)();
router.get("/", messages_1.displayForm);
router.post("/", messages_1.processForm);
exports.default = router;
