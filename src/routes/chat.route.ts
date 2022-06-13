import { Router } from "express";
import { list } from "../controllers/chat/chat.controller";

const router = Router();

router.get("/get-message", list);

export default router;
