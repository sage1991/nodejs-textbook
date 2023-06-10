export namespace Env {
  export const port = +process.env.PORT! ?? 3000

  export const datasource = {
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_SCHEMA!
  }
}
