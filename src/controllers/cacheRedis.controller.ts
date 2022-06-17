import { myDataSource } from "../database/data-source";
import { Request, Response } from "express";
import { mapResCode } from "../serverConfig/mapResCode";
import { baseResponse } from "../helpers/baseResponse/baseResponse";
import { User } from "../database/entity/User";
import redis from "redis";
import bluebird from "bluebird";
import _ from "lodash";

bluebird.promisifyAll(redis);
const client = redis.createClient();

export const list = async (req: Request, res: Response) => {
  const data = await myDataSource.getRepository(User).find();
  res.json(
    baseResponse(mapResCode.success.code, data, "For Example Cache Redis")
  );
};

export const listCache = async (req: Request, res: Response) => {
  const cacheData = await client
    .getAsync("user")
    .then((data: string) => {
      return JSON.parse(data);
    })
    .then(async (result: any) => {
      if (_.isEmpty(result)) {
        const user = await myDataSource.getRepository(User).find();
        await client.set("user", JSON.stringify(user));
        return user;
      }
      return result;
    });
  res.json(
    baseResponse(mapResCode.success.code, cacheData, "For Example Cache Redis")
  );
};

export const listCacheTime = async (req: Request, res: Response) => {
  const cacheData = await client
    .getAsync("user")
    .then((data: string) => {
      return JSON.parse(data);
    })
    .then(async (result: any) => {
      if (_.isEmpty(result)) {
        const user = await myDataSource.getRepository(User).find();
        await client.setex("user", 10, JSON.stringify(user));
        return user;
      }
      return result;
    });
  res.json(
    baseResponse(mapResCode.success.code, cacheData, "For Example Cache Redis")
  );
};

export const updateDataAndDeleteRedis = async (req: Request, res: Response) => {
  // const data = await myDataSource.getRepository(User).findAndCount();
  const { id, name } = req.params;
  const data = await myDataSource.getRepository(User).findOne({
    where: { id: Number(id) },
  });
  myDataSource.getRepository(User).merge(data, { name });
  const result = await myDataSource.getRepository(User).save(data);
  client.del("user");
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
  const data = await myDataSource.getRepository(User).findOne({
    where: { id: Number(id) },
  });
  myDataSource.getRepository(User).merge(data, { name });
  const resultData = await myDataSource.getRepository(User).save(data);

  // update Redis
  await client
    .getAsync("user")
    .then((data: string) => {
      return JSON.parse(data);
    })
    .then(async (result: any) => {
      if (!_.isEmpty(result)) {
        const updateRedis = result.map((item: any, index: number) => {
          return item.id === resultData.id ? resultData : item;
        });
        await client.set("user", JSON.stringify(updateRedis));
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
  client.del("user");
  res.json(baseResponse(mapResCode.success.code, null, "Clear Cache Redis"));
};
