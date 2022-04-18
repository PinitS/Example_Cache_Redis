import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { UserDetail } from "./entity/UserDetail";
import { Resume } from "./entity/Resume";

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_CONNECTION,
  DATABASE_PORT,
} = process.env;

export const myDataSource = new DataSource({
  type: DATABASE_CONNECTION,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  entities: [User, UserDetail, Resume],
  logging: true,
  synchronize: true,
});
