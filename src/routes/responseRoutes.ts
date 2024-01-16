import { Router } from "express";
import {
  createUserReply,
  getOneUserReply
} from "../controllers/responseDataControl";

const router = Router();

router.post("/", createUserReply);

router.get("/:response_id", getOneUserReply);

export default router;
