import { DataSource } from "typeorm"

import { Env } from "../const"
import {
  FollowEntity,
  HashTagEntity,
  PostEntity,
  PostHashTagEntity,
  UserEntity
} from "../../entity"

export const datasource = new DataSource({
  type: "mysql",
  host: Env.datasource.host,
  port: Env.datasource.port,
  username: Env.datasource.username,
  password: Env.datasource.password,
  database: Env.datasource.database,
  entities: [UserEntity, PostEntity, HashTagEntity, FollowEntity, PostHashTagEntity],
  logging: true
})
