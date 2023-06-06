import { type SequelizeOptions } from "sequelize-typescript"

export const config = {
  username: process.env.DB_USER_NAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  host: process.env.DB_HOST!,
  dialect: "mysql" as SequelizeOptions["dialect"]
}
