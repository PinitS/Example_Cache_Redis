import "dotenv/config";
import express, { Application, Request, Response } from "express";
import { myDataSource } from "../src/database/data-source";
import bodyParser from "body-parser";
import cors from "cors";
import seedRoute from "./routes/seed.route";
import chatRoute from "./routes/chat.route";

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
app.use("/seed", seedRoute);
app.use("/chat", chatRoute);



app.listen(SERVER_PORT, () => {
  console.log("Server is running on port :>> ", SERVER_PORT);
});
