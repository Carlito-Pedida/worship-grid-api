import { Router } from "express";
import {
  createUserReply,
  deleteUserResponse,
  getOneUserResponse,
  updateUserResponse
} from "../controllers/responseDataControl";

const router = Router();

router.post("/", createUserReply);

router.get("/:response_id", getOneUserResponse);

router.put("/:response_id", updateUserResponse);

router.delete("/:response_id", deleteUserResponse);

export default router;
