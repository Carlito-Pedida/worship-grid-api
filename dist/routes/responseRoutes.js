"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const responseDataControl_1 = require("../controllers/responseDataControl");
const router = (0, express_1.Router)();
router.post("/", responseDataControl_1.createUserReply);
router.get("/:response_id", responseDataControl_1.getOneUserResponse);
router.put("/:response_id", responseDataControl_1.updateUserResponse);
router.delete("/:response_id", responseDataControl_1.deleteUserResponse);
exports.default = router;
//# sourceMappingURL=responseRoutes.js.map