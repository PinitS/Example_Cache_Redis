import { Router, Request, Response } from "express";
import { secretToken } from "../middleware/secretToken.middleware";
import {
  getAll,
  getOne,
  create,
  update,
  destroy,
  getDropdownCache,
  getQueryBelongTo,
} from "../controllers/example.controller";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";

const router = Router();

router.get("/getAll", secretToken, getAll);
router.get("/getOne/:id", secretToken, getOne);
router.post("/create", secretToken, create);
router.get("/update", secretToken, update);
router.get("/destroy/:id", secretToken, destroy);
router.get("/getDropdownCache", secretToken, getDropdownCache);
router.get("/getQueryBelongTo", secretToken, getQueryBelongTo);

router.get("/middleware", secretToken, (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "middleware Guide"));
});

export default router;
