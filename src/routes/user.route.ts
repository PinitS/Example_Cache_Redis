import { create, getUsers, mockUsers } from "./../controllers/user.controller";
import { Router } from "express";

const router = Router();
router.post("/getUsers", getUsers);
router.get("/mockUpUsers", mockUsers);
router.post("/create", create);


export default router;
