import { DataSource } from "typeorm"

import { Env } from "../const"
import { Follow, HashTag, Post, PostHashTag, User } from "../../entity"

export const datasource = new DataSource({
  type: "mysql",
  host: Env.datasource.host,
  port: Env.datasource.port,
  username: Env.datasource.username,
  password: Env.datasource.password,
  database: Env.datasource.database,
  entities: [User, Post, HashTag, Follow, PostHashTag],
  logging: true
})
