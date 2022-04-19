import { convertDataToDropdown } from "./../helpers/convert/convertDataToDropdown";
import { ExampleRelation } from "./../database/entity/example/ExampleRelation";
import { Example } from "./../database/entity/example/Example";
import {
  validatePagination,
  calTotalPage,
} from "./../helpers/pagination/pagination";
import { myDataSource } from "./../database/data-source";
import { Request, Response } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
import _ from "lodash";

export const getAll = async (req: Request, res: Response) => {
  const { page, size } = validatePagination(req.query.page, req.query.size);
  const [data, total] = await myDataSource.getRepository(Example).findAndCount({
    select: ["firstName", "lastName"],
    take: size,
    skip: (page - 1) * size,
    cache: true,
  });
  const result = {
    data: data,
    page,
    size,
    totalPage: calTotalPage(total, size),
  };
  res.json(
    baseResponse(
      mapResCode.success.code,
      result,
      "Example Get All with pagination"
    )
  );
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  // try {
  const data = await myDataSource.getRepository(Example).findOne({
    relations: {
      exampleRelations: true,
    },
    // select: ["fullName"],
    where: { id: Number(id) },
  });

  res.json(
    baseResponse(mapResCode.success.code, data, `Example Get One id : ${id}`)
  );
  // } catch (error) {
  //   res.json(baseResponse(error.sqlState, null, error.sqlMessage));
  // }
};

export const create = async (req: Request, res: Response) => {
  try {
    const exampleRelation1 = new ExampleRelation();
    exampleRelation1.name =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const exampleRelation2 = new ExampleRelation();
    exampleRelation2.name =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const { firstName, lastName } = req.body;
    const example = new Example();
    example.firstName = firstName;
    example.lastName = lastName;

    example.exampleRelations = [exampleRelation1, exampleRelation2];
    const result = await myDataSource.manager.save(example);
    const data = result;
    res.json(baseResponse(mapResCode.success.code, data, "Example Create"));
  } catch (error) {
    res.json(baseResponse(error.errno, null, error.sqlMessage));
  }
};

export const update = async (req: Request, res: Response) => {
  const data = null;
  res.json(baseResponse(mapResCode.success.code, data, "Example Update"));
};

export const destroy = async (req: Request, res: Response) => {
  // delete in relation
  const { id } = req.params;
  const results = await myDataSource.getRepository(Example).delete(id);
  const data = results;
  res.json(baseResponse(mapResCode.success.code, data, "Example Destroy"));
};

export const getDropdownCache = async (req: Request, res: Response) => {
  const data = await myDataSource
    .getRepository(ExampleRelation)
    .find({ select: ["id", "name"], cache: true });
  const convertData = await convertDataToDropdown(data);
  res.json(
    baseResponse(
      mapResCode.success.code,
      { data, convertData },
      "Example GetDropdownCache"
    )
  );
};

export const getQueryBelongTo = async (req: Request, res: Response) => {
  // const data = await myDataSource.getRepository(Resume).find({
  //   where: { id: 1 },
  //   relations: {
  //     user: true,
  //   },
  // });
  // res.json(
  //   baseResponse(mapResCode.success.code, data, "Example QueryBelongTo")
  // );
};
