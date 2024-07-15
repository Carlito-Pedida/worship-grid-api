"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rssDataControl_1 = require("../controllers/rssDataControl");
const router = (0, express_1.Router)();
router.get("/feeds", rssDataControl_1.getRssFeeds);
exports.default = router;
//# sourceMappingURL=rssRoutes.js.map