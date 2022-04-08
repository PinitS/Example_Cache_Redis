import {
  validatePagination,
  calTotalPage,
} from "./../helpers/pagination/pagination";
import { Resume } from "./../database/entity/Resume";
import { myDataSource } from "./../database/data-source";
import { User } from "./../database/entity/User";
import { Request, Response } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";

export const getAll = async (req: Request, res: Response) => {
  // pagination and select
  const { page, size } = validatePagination(req.query.page, req.query.size);
  const [data, total] = await myDataSource.getRepository(User).findAndCount({
    select: ["firstName"],
    take: size,
    skip: (page - 1) * size,
  });
  const result = {
    data,
    page,
    size,
    totalPage: calTotalPage(total, size),
  };
  res.json(baseResponse(mapResCode.success.code, result, "Example Get All with pagination"));
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await myDataSource
      .getRepository(User)
      .findOneBy({ id: Number(id) });
    res.json(
      baseResponse(mapResCode.success.code, data, `Example Get One id : ${id}`)
    );
  } catch (error) {
    res.json(baseResponse(error.sqlState, null, error.sqlMessage));
  }
};

export const create = async (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "Example Create"));
};

export const update = async (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "Example Update"));
};

export const destroy = async (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "Example Destroy"));
};

export const getQueryOneToMany = async (req: Request, res: Response) => {
  const data = await myDataSource.getRepository(User).find({
    relations: {
      resumes: true,
    },
  });
  res.json(
    baseResponse(mapResCode.success.code, data, "Example QueryOneToMany")
  );
};

export const getQueryBelongTo = async (req: Request, res: Response) => {
  const data = await myDataSource.getRepository(Resume).find({
    where: { id: 1 },
    relations: {
      user: true,
    },
  });
  res.json(
    baseResponse(mapResCode.success.code, data, "Example QueryBelongTo")
  );
};
