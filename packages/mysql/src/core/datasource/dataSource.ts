import { DataSource } from "typeorm"

import { Env } from "../const"
import { User, Comment } from "../../entity"

export const dataSource = new DataSource({
  type: "mysql",
  host: Env.datasource.host,
  port: Env.datasource.port,
  username: Env.datasource.username,
  password: Env.datasource.password,
  database: Env.datasource.database,
  logging: true,
  entities: [User, Comment]
})
