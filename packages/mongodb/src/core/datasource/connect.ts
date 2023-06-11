import * as mongoose from "mongoose"

import { Env } from "../const"

export const connect = async () => {
  mongoose.set("debug", true) // show generated query
  await mongoose.connect(`mongodb://${Env.datasource.host}:${Env.datasource.port}`, {
    user: Env.datasource.username,
    pass: Env.datasource.password,
    dbName: Env.datasource.name
  })
}
