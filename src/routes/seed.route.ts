import { Router } from "express";
import { create } from "../controllers/seed/seed.controller";

const router = Router();

router.get("/create", create);

export default router;
