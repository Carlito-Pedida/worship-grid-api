import { Router } from "express";
import {
  deleteUserData,
  getOneUser,
  signinUser,
  signupUser,
  updateUserData
} from "../controllers/userDataContol";

const router = Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.get("/:user_id", getOneUser);

router.put("/:user_id/edit", updateUserData);

router.delete("/:user_id", deleteUserData);

export default router;
