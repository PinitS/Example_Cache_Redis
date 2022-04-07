import { Router, Request, Response } from "express";
import { secretToken } from "../middleware/secretToken.middleware";
import {
  getAll,
  getOne,
  create,
  update,
  destroy,
} from "../controllers/example.controller";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
const router = Router();

router.get("/getAll", secretToken, getAll);
router.get("/getOne", secretToken, getOne);
router.get("/create", secretToken, create);
router.get("/update", secretToken, update);
router.get("/destroy", secretToken, destroy);

// router.get("/get/:id", (req: Request, res: Response) => {
//   // const data = { params: req.params, query: req.query };
//   // res.json(baseResponse(mapResCode.success.code, data, "Main Guide"));
// });

router.get("/middleware", secretToken, (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "middleware Guide"));
});

export default router;
