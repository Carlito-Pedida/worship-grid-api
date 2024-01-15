import { Router } from "express";
import {
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

export default router;
