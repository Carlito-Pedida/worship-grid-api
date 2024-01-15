import { Router } from "express";
import {
  getOneUser,
  signinUser,
  signupUser
} from "../controllers/userDataContol";

const router = Router();

router.post("/signup", signupUser);

router.post("/signin", signinUser);

router.get("/:user_id", getOneUser);

export default router;
