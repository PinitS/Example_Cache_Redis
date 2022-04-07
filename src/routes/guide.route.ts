import { Router, Request, Response } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
import { secretToken } from "../middleware/secretToken.middleware";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "Main Guide"));
});

router.get("/get/:id", (req: Request, res: Response) => {
  const data = { params: req.params, query: req.query };
  res.json(baseResponse(mapResCode.success.code, data, "Main Guide"));
});

router.get("/middleware", secretToken, (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "middleware Guide"));
});

export default router;
