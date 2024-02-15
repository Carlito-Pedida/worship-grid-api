import { Router } from "express";
import {
  deleteUserData,
  getAllUserData,
  getOneUser,
  getUserAssets,
  signinUser,
  signupUser,
  updateUserData
} from "../controllers/userDataContol";

const router = Router();

router.get("/", getAllUserData);

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.get("/:user_id", getOneUser);

router.get("/asset/:user_id", getUserAssets);

router.put("/:user_id", updateUserData);

router.delete("/:user_id", deleteUserData);

export default router;
