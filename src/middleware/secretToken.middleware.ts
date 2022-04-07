import { baseResponse } from "../helpers/baseResponse/baseResponse";
import { Request, Response, NextFunction } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
const { SERVER_SECRET_TOKEN } = process.env;

export const secretToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers["secret-token"] === SERVER_SECRET_TOKEN) {
    next();
  } else {
    res.json(
      baseResponse(
        mapResCode.unauthorizedSecret.code,
        null,
        mapResCode.unauthorizedSecret.message
      )
    );
  }
};
