// import { POCRedis } from "./entity/POCRedis";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_CONNECTION,
  DATABASE_PORT,
} = process.env;

export const myDataSource = new DataSource({
  timezone: "+7:00",
  type: DATABASE_CONNECTION,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  entities: [User],
  logging: true,
  synchronize: true,
});
