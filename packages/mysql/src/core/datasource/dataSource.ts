import { DataSource } from "typeorm"

import { Comment, User } from "../../entity"
import { Env } from "../const"

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
