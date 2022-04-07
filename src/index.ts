import "dotenv/config";
import express, { Application, Request, Response } from "express";
import guideRoute from "./routes/guide.route";

const app: Application = express();
const { SERVER_PORT } = process.env;

app.get("/versions", (req: Request, res: Response) => {
  res.json({ code: 50200, data: null, message: "example ts versions 1.0.0.1" });
});

app.use("/guide", guideRoute);

app.listen(SERVER_PORT, () => {
  console.log("Server is running on port :>> ", SERVER_PORT);
});
