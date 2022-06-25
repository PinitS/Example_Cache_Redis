import { Router, Request, Response } from "express";
import { secretToken } from "../middleware/secretToken.middleware";
import {
    clearRedis,
    list,
    listCache,
    listCacheTime,
    updateDataAndDeleteRedis,
    updateDataAndUpdateRedis,
  } from "../controllers/cacheRedis.controller";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
import { seed } from "../controllers/seed.controller";

const router = Router();

router.get("/mock-user", seed);
router.get("/get", list);
router.get("/get-with-cache", listCache);
router.get("/get-with-cache-time", listCacheTime);
router.get("/update-and-delete-redis/:id/:name", updateDataAndDeleteRedis);
router.get("/update-and-update-redis/:id/:name", updateDataAndUpdateRedis);
router.get("/clear-redis", clearRedis);

router.get("/middleware", secretToken, (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "middleware Guide"));
});

export default router;
