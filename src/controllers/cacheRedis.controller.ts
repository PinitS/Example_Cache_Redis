import { myDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
import { POCRedis } from "../database/entity/POCRedis";
import redis from "redis";
import bluebird from "bluebird";
import _ from "lodash";

bluebird.promisifyAll(redis);
const client = redis.createClient();

export const list = async (req: Request, res: Response) => {
  const data = await myDataSource.getRepository(POCRedis).find();
  res.json(
    baseResponse(mapResCode.success.code, data, "For Example Cache Redis")
  );
};

export const listCache = async (req: Request, res: Response) => {
  const cacheData = await client
    .getAsync("POCRedis")
    .then((data: string) => {
      return JSON.parse(data);
    })
    .then(async (result: any) => {
      if (_.isEmpty(result)) {
        const pocRedis = await myDataSource.getRepository(POCRedis).find();
        await client.set("POCRedis", JSON.stringify(pocRedis));
        return pocRedis;
      }
      return result;
    });
  res.json(
    baseResponse(mapResCode.success.code, cacheData, "For Example Cache Redis")
  );
};

export const listCacheTime = async (req: Request, res: Response) => {
  const cacheData = await client
    .getAsync("POCRedis")
    .then((data: string) => {
      return JSON.parse(data);
    })
    .then(async (result: any) => {
      if (_.isEmpty(result)) {
        const pocRedis = await myDataSource.getRepository(POCRedis).find();
        await client.setex("POCRedis", 10, JSON.stringify(pocRedis));
        return pocRedis;
      }
      return result;
    });
  res.json(
    baseResponse(mapResCode.success.code, cacheData, "For Example Cache Redis")
  );
};

export const updateDataAndDeleteRedis = async (req: Request, res: Response) => {
  // const data = await myDataSource.getRepository(pocRedis).findAndCount();
  const { id, name } = req.params;
  const data = await myDataSource.getRepository(POCRedis).findOne({
    where: { id: Number(id) },
  });
  myDataSource.getRepository(POCRedis).merge(data, { name });
  const result = await myDataSource.getRepository(POCRedis).save(data);
  client.del("POCRedis");
  res.json(
    baseResponse(
      mapResCode.success.code,
      result,
      "Update Data Way One = Delete Redis"
    )
  );
};

export const updateDataAndUpdateRedis = async (req: Request, res: Response) => {
  const { id, name } = req.params;
  const data = await myDataSource.getRepository(POCRedis).findOne({
    where: { id: Number(id) },
  });
  myDataSource.getRepository(POCRedis).merge(data, { name });
  const resultData = await myDataSource.getRepository(POCRedis).save(data);

  // update Redis
  await client
    .getAsync("POCRedis")
    .then((data: string) => {
      return JSON.parse(data);
    })
    .then(async (result: any) => {
      if (!_.isEmpty(result)) {
        const updateRedis = result.map((item: any, index: number) => {
          return item.id === resultData.id ? resultData : item;
        });
        await client.set("POCRedis", JSON.stringify(updateRedis));
      }
    });
  // update Redis
  res.json(
    baseResponse(
      mapResCode.success.code,
      resultData,
      "Update Data Way Two = Update Redis"
    )
  );
};

export const clearRedis = async (req: Request, res: Response) => {
  client.del("POCRedis");
  res.json(baseResponse(mapResCode.success.code, null, "Clear Cache Redis"));
};
