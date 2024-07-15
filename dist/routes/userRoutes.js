"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userDataContol_1 = require("../controllers/userDataContol");
const router = (0, express_1.Router)();
router.get("/", userDataContol_1.getAllUserData);
router.post("/signup", userDataContol_1.signupUser);
router.post("/signin", userDataContol_1.signinUser);
router.get("/:user_id", userDataContol_1.getOneUser);
router.get("/assets/:user_id", userDataContol_1.getUserAssets);
router.put("/:user_id", userDataContol_1.updateUserData);
router.delete("/:user_id", userDataContol_1.deleteUserData);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map