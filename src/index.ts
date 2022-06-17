import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { myDataSource } from "../src/database/data-source";
import bodyParser from "body-parser";
import cors from "cors";
import { seed } from "./controllers/seed.controller";
import {
  clearRedis,
  list,
  listCache,
  listCacheTime,
  updateDataAndDeleteRedis,
  updateDataAndUpdateRedis,
} from "./controllers/cacheRedis.controller";
const app: Application = express();
const { SERVER_PORT } = process.env;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization: >>>>", err);
  });

app.get("/versions", (req: Request, res: Response) => {
  res.json({ code: 50200, data: null, message: "example ts versions 1.0.0.1" });
});

app.get("/mock-user", seed);
app.get("/get", list);
app.get("/get-with-cache", listCache);
app.get("/get-with-cache-time", listCacheTime);
app.get("/update-and-delete-redis/:id/:name", updateDataAndDeleteRedis);
app.get("/update-and-update-redis/:id/:name", updateDataAndUpdateRedis);


app.get("/clear-redis", clearRedis);

app.listen(SERVER_PORT, () => {
  console.log("Server is running on port :>> ", SERVER_PORT);
});
