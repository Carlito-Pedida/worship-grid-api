import { Router } from "express";
import { getRssFeeds } from "../controllers/rssDataControl";

const router = Router();

router.get("/feeds", getRssFeeds);

export default router;
