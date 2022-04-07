import "reflect-metadata"
import { DataSource } from "typeorm"

export const myDataSource = new DataSource({
    type: "mysql",
    host: "127.0.0.1",
    port: 3307,
    username: "root",
    password: "password",
    database: "type_orm_db",
    entities: ["src/entity/*.js"],
    logging: true,
    synchronize: true,
})
