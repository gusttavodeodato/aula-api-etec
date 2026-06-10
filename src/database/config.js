import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASS,
    entities: ["src/model/*.js"],
    migrations: [path.join(process.cwd(), "src/database/migrations/*.cjs")],
});

export { appDataSource };