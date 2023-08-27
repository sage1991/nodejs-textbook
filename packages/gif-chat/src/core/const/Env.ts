import * as process from "process"

export namespace Env {
  export const cookieSecret = process.env.COOKIE_SECRET!

  export const mongo = {
    host: process.env.MONGO_HOST!,
    port: process.env.MONGO_PORT!,
    user: process.env.MONGO_USER!,
    password: process.env.MONGO_PASSWORD!,
    dbName: process.env.MONGO_DB_NAME!
  }

  export const webSocketPort = +process.env.WEB_SOCKET_PORT
}
